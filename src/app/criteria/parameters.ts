import { Criteria, TypeCriterion } from "../criteria";
import type { Type } from "../card";

export class Parameters {

  static toTC(t: Type, input: string | null): TypeCriterion {
    const s = input || "";
    const parts = s.split(",");
    const c = (str: string) => { const i = parseInt(str); return isNaN(i) ? undefined : i; };

    if (parts.length > 1) {
      return new TypeCriterion(t, c(parts[0]) ?? 0, c(parts[1]));
    } else if (parts.length == 1) {
      return new TypeCriterion(t, c(parts[0]) ?? 0);
    } else {
      return new TypeCriterion(t, 0);
    }
  };

  static toCriteria(params: URLSearchParams): Criteria {
    const decks = params.get("decks") ?? "";
    return {
      includeTrains: decks.indexOf("tr") >= 0,
      includeRisingSun: decks.indexOf("rs") >= 0,
      includeCoastalTides: decks.indexOf("ct") >= 0,
      action: Parameters.toTC("Action", params.get("a")),
      attack: Parameters.toTC("Attack", params.get("k")),
      railLaying: Parameters.toTC("Rail Laying", params.get("r")),
      stationExpansion: Parameters.toTC("Station Expansion", params.get("s")),
      train: Parameters.toTC("Train", params.get("t")),
      vp: Parameters.toTC("Victory Points", params.get("v")),
      preset: "",
      seed: NaN,
    };
  }

  static fromTc(t: TypeCriterion, key: string, params: URLSearchParams) : void {
    var s = "";
    if (t.min) {
      s = s + t.min;
    }
    if (t.max !== undefined) {
      s = s + "," + t.max;
    }
    if (s) {
      params.append(key, s);
    }
  }

  static fromCriteria(c: Criteria, seed: number): URLSearchParams {
    var p = new URLSearchParams();
    p.append("c", "");

    var decks = [];
    if (c.includeTrains) { decks.push("tr"); }
    if (c.includeRisingSun) { decks.push("rs"); }
    if (c.includeCoastalTides) { decks.push("ct"); }
    p.append("decks", decks.join(","));

    Parameters.fromTc(c.action, "a", p);
    Parameters.fromTc(c.attack, "k", p);
    Parameters.fromTc(c.railLaying, "r", p);
    Parameters.fromTc(c.stationExpansion, "s", p);
    Parameters.fromTc(c.train, "t", p);
    Parameters.fromTc(c.vp, "v", p);

    p.append("seed", seed.toString());
    return p;
  }
}