export class Neft {

    rss: {
        channel: {
          link: string;
           item: [{
            description: string;
            guid: string;
            pubDate: Date;
            title: string;
            link: string;
           }]
        }
    };
}
