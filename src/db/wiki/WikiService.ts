import { Wikis } from ".."
type WikiInput = {
  name?: string
  address?: string
  public?: boolean
}
class WikiService {
	async findWiki(_id: string) {
			const out = await Wikis.findOne({ _id })
			return out
  }
  
  async getWikiList(_id: string) {
    const out = await Wikis.find({}, {_id})
  }

  async createWiki(wiki: WikiInput) {
    const out = await Wikis.create(wiki)
    return out
	}

  async updateWiki(_id: string, wiki: WikiInput) {
    const out = await Wikis.updateOne({ _id }, wiki)
    return out
	}

  async removeWiki(_id: string) {
    const out = await Wikis.deleteOne({ _id })
    return out
	}
}
const wikiService = new WikiService()
export { wikiService }
