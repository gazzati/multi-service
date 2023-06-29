import BaseService from "@api/base.service"
import maxmind, { CityResponse } from "maxmind"

import type { IResult } from "ua-parser-js"

import type { IpLookup } from "./stat.interface"

import type { GetStatsResponse } from "./stat.schema"

class StatService extends BaseService {
  private lookup = maxmind.open<CityResponse>("./data/GeoLite2-City.mmdb")

  public async getStats(): Promise<GetStatsResponse> {
    const response = await this.entities.Visit.count()

    return {
      visits: response || 0
    }
  }

  public async addVisit(ip: string, payload: IResult): Promise<boolean> {
    const { ua, browser, os, device } = payload

    const ipLookup = await this.getIpLookup(ip)

    const response = await this.entities.Visit.insert({
      ip,
      ua,
      browser: browser.name && `${browser.name}:${browser.version}`,
      os: os.name && `${os.name}:${os.version}`,
      device: device.vendor && `${device.vendor}-${device.model}`,
      ...(ipLookup && ipLookup)
    })

    return !!response
  }

  private async getIpLookup(ip: string): Promise<Partial<IpLookup> | null> {
    const result = (await this.lookup).get(ip)
    if (!result) return null

    return {
      country: result.country?.names.en || undefined,
      region: result.subdivisions?.at(0)?.names.en || undefined,
      city: result.city?.names.en || undefined,
      latitude: result.location?.latitude.toFixed(4) || undefined,
      longitude: result.location?.longitude.toFixed(4) || undefined
    }
  }
}

export default StatService
