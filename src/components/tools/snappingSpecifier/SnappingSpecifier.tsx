import React, { useEffect, useState } from 'react'
import SnappingSpecifierForm from './SnappingSpecifierForm'
import { Difficulty, MillisecondSnappingReference, SnapType } from '../../../Types'
import { calculateSnaps } from '../../../utils/MilliSecondsUtil'
import './SnappingSpecifier.scss'

export default function SnappingSpecifier() {
  const [bpm, setBpm] = useState(180.0)
  const [customNumerator, setCustomNumerator] = useState(1)
  const [customDenominator, setCustomDenominator] = useState(1)
  const [result, setResult] = useState<SnappingResult[]>([])

  useEffect(() => {
    const snaps = calculateSnaps(bpm, customNumerator, customDenominator)
    setResult(specifySnappingCategories(snaps))
  }, [bpm, customNumerator, customDenominator])

  function GetSnapType(diff: Difficulty, snap: number, isHyperdash: boolean): SnapType {
    const flooredSnap = Math.floor(snap)

    switch (diff) {
      case Difficulty.CUP:
        return SnapType.DISALLOWED
      case Difficulty.SALAD:
        if (isHyperdash) {
          return SnapType.DISALLOWED
        }
        if (flooredSnap < 125) {
          return SnapType.DISALLOWED
        }
        if (flooredSnap < 250) {
          return SnapType.HIGHER_SNAPPED
        }

        return SnapType.BASIC_SNAPPED
      case Difficulty.PLATTER:
        if (isHyperdash) {
          if (flooredSnap < 125) {
            return SnapType.DISALLOWED
          }
          if (flooredSnap < 250) {
            return SnapType.HIGHER_SNAPPED
          }

          return SnapType.BASIC_SNAPPED
        }

        if (flooredSnap < 62) {
          return SnapType.DISALLOWED
        }
        if (flooredSnap < 125) {
          return SnapType.HIGHER_SNAPPED
        }
        return SnapType.BASIC_SNAPPED
      case Difficulty.RAIN:
        if (flooredSnap < 62) {
          return SnapType.DISALLOWED
        }
        if (flooredSnap < 125) {
          return SnapType.HIGHER_SNAPPED
        }

        return SnapType.BASIC_SNAPPED
      default:
        return SnapType.NONE
    }
  }

  function specifySnappingCategories(snaps: MillisecondSnappingReference): SnappingResult[] {
    return [
      {
        diff: Difficulty.CUP,
        dashSnaps: [
          GetSnapType(Difficulty.CUP, snaps.whiteTick, false),
          GetSnapType(Difficulty.CUP, snaps.redTick, false),
          GetSnapType(Difficulty.CUP, snaps.purpleTick, false),
          GetSnapType(Difficulty.CUP, snaps.blueTick, false),
          GetSnapType(Difficulty.CUP, snaps.darkPurpleTick, false),
          GetSnapType(Difficulty.CUP, snaps.custom, false)
        ],
        hyperdashSnaps: [
          GetSnapType(Difficulty.CUP, snaps.whiteTick, true),
          GetSnapType(Difficulty.CUP, snaps.redTick, true),
          GetSnapType(Difficulty.CUP, snaps.purpleTick, true),
          GetSnapType(Difficulty.CUP, snaps.blueTick, true),
          GetSnapType(Difficulty.CUP, snaps.darkPurpleTick, true),
          GetSnapType(Difficulty.CUP, snaps.custom, true)
        ]
      },
      {
        diff: Difficulty.SALAD,
        dashSnaps: [
          GetSnapType(Difficulty.SALAD, snaps.whiteTick, false),
          GetSnapType(Difficulty.SALAD, snaps.redTick, false),
          GetSnapType(Difficulty.SALAD, snaps.purpleTick, false),
          GetSnapType(Difficulty.SALAD, snaps.blueTick, false),
          GetSnapType(Difficulty.SALAD, snaps.darkPurpleTick, false),
          GetSnapType(Difficulty.SALAD, snaps.custom, false)
        ],
        hyperdashSnaps: [
          GetSnapType(Difficulty.SALAD, snaps.whiteTick, true),
          GetSnapType(Difficulty.SALAD, snaps.redTick, true),
          GetSnapType(Difficulty.SALAD, snaps.purpleTick, true),
          GetSnapType(Difficulty.SALAD, snaps.blueTick, true),
          GetSnapType(Difficulty.SALAD, snaps.darkPurpleTick, true),
          GetSnapType(Difficulty.SALAD, snaps.custom, true)
        ]
      },
      {
        diff: Difficulty.PLATTER,
        dashSnaps: [
          GetSnapType(Difficulty.PLATTER, snaps.whiteTick, false),
          GetSnapType(Difficulty.PLATTER, snaps.redTick, false),
          GetSnapType(Difficulty.PLATTER, snaps.purpleTick, false),
          GetSnapType(Difficulty.PLATTER, snaps.blueTick, false),
          GetSnapType(Difficulty.PLATTER, snaps.darkPurpleTick, false),
          GetSnapType(Difficulty.PLATTER, snaps.custom, false)
        ],
        hyperdashSnaps: [
          GetSnapType(Difficulty.PLATTER, snaps.whiteTick, true),
          GetSnapType(Difficulty.PLATTER, snaps.redTick, true),
          GetSnapType(Difficulty.PLATTER, snaps.purpleTick, true),
          GetSnapType(Difficulty.PLATTER, snaps.blueTick, true),
          GetSnapType(Difficulty.PLATTER, snaps.darkPurpleTick, true),
          GetSnapType(Difficulty.PLATTER, snaps.custom, true)
        ]
      },
      {
        diff: Difficulty.RAIN,
        dashSnaps: [
          GetSnapType(Difficulty.RAIN, snaps.whiteTick, false),
          GetSnapType(Difficulty.RAIN, snaps.redTick, false),
          GetSnapType(Difficulty.RAIN, snaps.purpleTick, false),
          GetSnapType(Difficulty.RAIN, snaps.blueTick, false),
          GetSnapType(Difficulty.RAIN, snaps.darkPurpleTick, false),
          GetSnapType(Difficulty.RAIN, snaps.custom, false)
        ],
        hyperdashSnaps: [
          GetSnapType(Difficulty.RAIN, snaps.whiteTick, true),
          GetSnapType(Difficulty.RAIN, snaps.redTick, true),
          GetSnapType(Difficulty.RAIN, snaps.purpleTick, true),
          GetSnapType(Difficulty.RAIN, snaps.blueTick, true),
          GetSnapType(Difficulty.RAIN, snaps.darkPurpleTick, true),
          GetSnapType(Difficulty.RAIN, snaps.custom, true)
        ]
      },
      {
        diff: Difficulty.OVERDOSE,
        dashSnaps: [
          GetSnapType(Difficulty.OVERDOSE, snaps.whiteTick, false),
          GetSnapType(Difficulty.OVERDOSE, snaps.redTick, false),
          GetSnapType(Difficulty.OVERDOSE, snaps.purpleTick, false),
          GetSnapType(Difficulty.OVERDOSE, snaps.blueTick, false),
          GetSnapType(Difficulty.OVERDOSE, snaps.darkPurpleTick, false),
          GetSnapType(Difficulty.OVERDOSE, snaps.custom, false)
        ],
        hyperdashSnaps: [
          GetSnapType(Difficulty.OVERDOSE, snaps.whiteTick, true),
          GetSnapType(Difficulty.OVERDOSE, snaps.redTick, true),
          GetSnapType(Difficulty.OVERDOSE, snaps.purpleTick, true),
          GetSnapType(Difficulty.OVERDOSE, snaps.blueTick, true),
          GetSnapType(Difficulty.OVERDOSE, snaps.darkPurpleTick, true),
          GetSnapType(Difficulty.OVERDOSE, snaps.custom, true)
        ]
      }
    ]
  }

  function getClassNameBasedOfSnapType(snapType: SnapType): string {
    if (snapType == SnapType.DISALLOWED) {
      return 'snap-type__disallowed'
    }
    if (snapType == SnapType.HIGHER_SNAPPED) {
      return 'snap-type__higher-snapped'
    }
    if (snapType == SnapType.BASIC_SNAPPED) {
      return 'snap-type__basic-snapped'
    }
    return ''
  }

  return (
    <div className="row">
      <div className="col-4">
        <SnappingSpecifierForm
          bpm={bpm}
          setBpm={setBpm}
          customNumerator={customNumerator}
          setCustomNumerator={setCustomNumerator}
          customDenominator={customDenominator}
          setCustomDenominator={setCustomDenominator}
        />
      </div>
      <div className="col-8">
        <table>
          <thead>
            <tr>
              <th>Difficulty</th>
              <th>Basic-snapped dash</th>
              <th>Higher-snapped dash</th>
              <th>Basic-snapped hyperdash</th>
              <th>Higher-snapped hyperdash</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>{Difficulty.CUP}</th>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
            <tr>
              <th>{Difficulty.SALAD}</th>
              <td>250 ms or higher</td>
              <td>125-249 ms</td>
              <td>-</td>
              <td>-</td>
            </tr>
            <tr>
              <th>{Difficulty.PLATTER}</th>
              <td>125 ms or higher</td>
              <td>62-124 ms</td>
              <td>250 ms or higher</td>
              <td>125-249 ms</td>
            </tr>
            <tr>
              <th>{Difficulty.RAIN}</th>
              <td>125 ms or higher</td>
              <td>62-124 ms</td>
              <td>125 ms or higher</td>
              <td>62-124 ms</td>
            </tr>
            <tr>
              <th>{Difficulty.OVERDOSE}</th>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="col-12">
        <table>
          <thead>
            <tr>
              <th rowSpan={2}>Difficulty</th>
              <th colSpan={6}>Dash Snaps</th>
              <th colSpan={6}>Hyperdash Snaps</th>
            </tr>
            <tr>
              <th>1/1</th>
              <th>1/2</th>
              <th>1/3</th>
              <th>1/4</th>
              <th>1/6</th>
              <th>{customNumerator.toString().concat('/').concat(customDenominator.toString())}</th>
              <th>1/1</th>
              <th>1/2</th>
              <th>1/3</th>
              <th>1/4</th>
              <th>1/6</th>
              <th>{customNumerator.toString().concat('/').concat(customDenominator.toString())}</th>
            </tr>
          </thead>
          <tbody>
            {result.map((value, index) => {
              const key = `result-${index}`
              return (
                <tr key={key}>
                  <th>{value.diff}</th>
                  <td className={getClassNameBasedOfSnapType(value.dashSnaps[0])}>
                    {value.dashSnaps[0]}
                  </td>
                  <td className={getClassNameBasedOfSnapType(value.dashSnaps[1])}>
                    {value.dashSnaps[1]}
                  </td>
                  <td className={getClassNameBasedOfSnapType(value.dashSnaps[2])}>
                    {value.dashSnaps[2]}
                  </td>
                  <td className={getClassNameBasedOfSnapType(value.dashSnaps[3])}>
                    {value.dashSnaps[3]}
                  </td>
                  <td className={getClassNameBasedOfSnapType(value.dashSnaps[4])}>
                    {value.dashSnaps[4]}
                  </td>
                  <td className={getClassNameBasedOfSnapType(value.dashSnaps[5])}>
                    {value.dashSnaps[5]}
                  </td>
                  <td className={getClassNameBasedOfSnapType(value.hyperdashSnaps[0])}>
                    {value.hyperdashSnaps[0]}
                  </td>
                  <td className={getClassNameBasedOfSnapType(value.hyperdashSnaps[1])}>
                    {value.hyperdashSnaps[1]}
                  </td>
                  <td className={getClassNameBasedOfSnapType(value.hyperdashSnaps[2])}>
                    {value.hyperdashSnaps[2]}
                  </td>
                  <td className={getClassNameBasedOfSnapType(value.hyperdashSnaps[3])}>
                    {value.hyperdashSnaps[3]}
                  </td>
                  <td className={getClassNameBasedOfSnapType(value.hyperdashSnaps[4])}>
                    {value.hyperdashSnaps[4]}
                  </td>
                  <td className={getClassNameBasedOfSnapType(value.hyperdashSnaps[5])}>
                    {value.hyperdashSnaps[5]}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

interface SnappingResult {
  diff: Difficulty
  dashSnaps: SnapType[]
  hyperdashSnaps: SnapType[]
}
