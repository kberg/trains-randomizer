import { Criteria, TypeCriterion } from "../criteria";
import { Type } from "../card";

export class Parameters {

  static toTC(t: Type, input: String): TypeCriterion {
    input = input || "";
    var inputs = input.split(",");
    var c = (s: string) => { var i = parseInt(s); return isNaN(i) ? undefined : i;};

    if (inputs.length > 1) {
      return new TypeCriterion(t, c(inputs[0]), c(inputs[1]));
    } else if (inputs.length == 1) {
      return new TypeCriterion(t, c(inputs[0]));
    } else {
      return new TypeCriterion(t, 0);
    }
  };

  static toCriteria(params: URLSearchParams): Criteria {
    var c = new Criteria();
    var decks = params.get("decks");
    if (decks.indexOf("tr") >= 0) {
      c.includeTrains = true;
    }
    if (decks.indexOf("rs") >= 0) {
      c.includeRisingSun = true;
    }
    if (decks.indexOf("ct") >= 0) {
      c.includeCoastalTides = true;
    }    
 
    c.action = Parameters.toTC(Type.Action, params.get("a"));
    c.attack = Parameters.toTC(Type.Attack, params.get("k"));
    c.railLaying = Parameters.toTC(Type.RailLaying, params.get("r"));
    c.stationExpansion = Parameters.toTC(Type.StationExpansion, params.get("s"));
    c.train = Parameters.toTC(Type.Train, params.get("t"));
    c.vp = Parameters.toTC(Type.VictoryPoints, params.get("v"));
 
    return c;
  }

  static fromTc(t: TypeCriterion, key: string, params: URLSearchParams) : void {
    var s = "";
    if(t.min) {
      s = s + t.min;
    }
    if (t.maxEnabled) {
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