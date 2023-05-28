export class Quote {
    constructor(
      private _id: string,
      private author: string,
      private authorSlug: string,
      public content: string,
      private dateAdded: Date,
      private dateModified: Date,
      private length: number,
      private tags: string[]
    ) { }
  }