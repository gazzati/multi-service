import BaseService from "@api/base.service"

import type { IResult } from "ua-parser-js"

import type { GetStatsResponse } from "./stat.schema"

class StatService extends BaseService {
  public async getStats(): Promise<GetStatsResponse> {
    const response = await this.entities.Visit.count()

    return {
      visits: response || 0
    }
  }

  public async addVisit(ip: string, payload: IResult): Promise<boolean> {
    const { ua, browser, os, device } = payload
    const response = await this.entities.Visit.insert({
      ip,
      ua,
      browser: browser.name && `${browser.name}:${browser.version}`,
      os: os.name && `${os.name}:${os.version}`,
      device: device.vendor && `${device.vendor}-${device.model}`
    })

    return !!response
  }
}

export default StatService
