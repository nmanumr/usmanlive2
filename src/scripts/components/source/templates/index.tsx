import {SourceFacts} from "../facts";
import {h} from "../../../utilities";

/**
 * Render repository facts
 *
 * @param facts - Repository facts
 *
 * @returns Element
 */
export function renderSourceFacts(facts: SourceFacts): HTMLElement {
  return (
    <ul class="flex text-xs space-x-2 opacity-75 source__facts">
      {
        facts.map(fact => (
          <li class="source__fact">{fact}</li>
        ))
      }
    </ul>
  )
}
