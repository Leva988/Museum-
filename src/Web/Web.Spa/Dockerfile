ARG REGISTRY=mcr.microsoft.com/
FROM ${REGISTRY}dotnet/aspnet:5.0.2 AS base
WORKDIR /app
EXPOSE 80
VOLUME [ "/app/wwwroot" ]

FROM node:14 as node-build
WORKDIR /web
COPY src/Web/Web.Spa/ClientApp/ .
RUN npm install && npm run build -- --prod

FROM ${REGISTRY:-mcr.microsoft.com/}dotnet/sdk:5.0.102-ca-patch-buster-slim AS build
WORKDIR /src
COPY . .
WORKDIR /src/src/Web/Web.Spa
ARG NUGET=https://api.nuget.org/v3/index.json
RUN dotnet restore Web.Spa.csproj -s ${NUGET}
RUN dotnet build Web.Spa.csproj --no-restore -c Release -o /app
 
FROM build AS publish
RUN dotnet publish Web.Spa.csproj -c Release -o /app

FROM base AS final
COPY ./cert/beloil.by-der.crt /usr/local/share/ca-certificates/
RUN set -x \
    && update-ca-certificates --fresh \
    && apt-get update \
    && apt-get install -y tzdata curl
WORKDIR /app
COPY --from=publish /app .
COPY --from=node-build /web/dist/museum-sis /app/ClientApp/dist
HEALTHCHECK CMD curl --fail http://localhost/hc || exit
ENTRYPOINT ["dotnet", "Web.Spa.dll"]