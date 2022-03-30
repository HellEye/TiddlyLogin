/// <reference types="mongoose" />
declare type WikiInput = {
    name?: string;
    address?: string;
    public?: boolean;
};
declare class WikiService {
    findWiki(_id: string): Promise<import("mongoose").Document<any, import("@typegoose/typegoose/lib/types").BeAnObject, any> & import("./WikiSchema").Wiki & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: any;
    }>;
    getWikiList(_id: string): Promise<void>;
    createWiki(wiki: WikiInput): Promise<import("mongoose").Document<any, import("@typegoose/typegoose/lib/types").BeAnObject, any> & import("./WikiSchema").Wiki & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: any;
    }>;
    updateWiki(_id: string, wiki: WikiInput): Promise<import("mongodb").UpdateResult>;
    removeWiki(_id: string): Promise<import("mongodb").DeleteResult>;
}
declare const wikiService: WikiService;
export { wikiService };
