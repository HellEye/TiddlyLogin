import { Error } from "mongoose"
import { Wikis } from ".."
import { NotFoundError } from "../../types/Errors"
import { userService } from '../users';
type WikiInput = {
  _id?: string
	name?: string
	address?: string
  public?: boolean
  description?: string
  subdomain?: string
}
class WikiService {
	async findWiki(_id: string) {
		try {
			return await Wikis.findOne({ _id })
		} catch (e) {
			if (e instanceof Error.DocumentNotFoundError)
				throw new NotFoundError("Wiki not found", "Wiki")
		}
  }
  async findWikiByName(name: string) {
    try {
      return await Wikis.findOne({name})
    } catch (e) {
      if (e instanceof Error.DocumentNotFoundError)
        throw new NotFoundError("Wiki not found", "Wiki")
    }
  }

	async getWikiList() {
		return await Wikis.find({}).lean()
	}

	async createWiki(wiki: WikiInput) {
    try {
      wiki._id = undefined
			return await Wikis.create(wiki)
		} catch (e) {
			if (e instanceof Error.DocumentNotFoundError)
        throw new NotFoundError("Wiki not found", "Wiki")
      throw e
		}
	}

	async updateWiki(_id: string, wiki: WikiInput) {
    try {
      wiki._id = undefined
			return await Wikis.updateOne({ _id }, wiki)
		} catch (e) {
			if (e instanceof Error.DocumentNotFoundError)
				throw new NotFoundError("Wiki not found", "Wiki")
		}
	}

	async removeWiki(_id: string) {
		try {
			return await Wikis.deleteOne({ _id })
		} catch (e) {
			if (e instanceof Error.DocumentNotFoundError)
				throw new NotFoundError("Wiki not found", "Wiki")
		}
	}

  async getWikisEditable(userId: string) {
    try {
      const user = await userService.getUser(userId)
      return await Wikis.find({_id: {$in: user.editWikis}})
    } catch (e) {
      if (e instanceof Error.DocumentNotFoundError)
        throw new NotFoundError("Specified wikis not found", "Wiki")
    }
  }

  async getWikisBrowseable(userId: string) {
    try {
      const user = await userService.getUser(userId)
      return await Wikis.find({_id: {$in: user.browseWikis}})

    } catch (e) {
      if (e instanceof Error.DocumentNotFoundError)
        throw new NotFoundError("Specified wikis not found", "Wiki")
    }
  }
}
const wikiService = new WikiService()
export { wikiService }
