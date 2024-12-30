import { calculateFlex, calculateLie } from './calculations';

interface StickRecommendation {
  name: string;
  description: string;
  flex: number;
  curve: string;
  lie: number;
  nhlers: string[];
  patterns: string[];
}

const P88_DESCRIPTION = "The second most popular curve on the market, this standard mid-curve with a slightly open face is perfect for stickhandling and puck possession. Designed for playmakers, it offers excellent puck control and pinpoint shooting accuracy.";

const P92_DESCRIPTION = "The most popular curve worldwide, favored by 95% of European pros, features a mid-toe design with an open face for precise toe drags and stickhandling. Ideal for shooters, it excels at elevating the puck on quick wristers and snapshots.";

const P28_DESCRIPTION = "Rapidly gaining popularity across all levels, including the NHL, this mid-toe curve with an open toe and large hook is perfect for skilled goal-scorers. Designed for easy puck elevation and corner-picking, it's the ultimate shooter's curve, though it may challenge beginner stickhandling.";

export const getStickRecommendations = (
  heightInInches: number,
  weightInLbs: number,
  skatingStyle: number,
  shootingStyle: number,
  playStyle: number
): { recommendations: StickRecommendation[] } => {
  const flex = calculateFlex(weightInLbs);
  const lie = calculateLie(skatingStyle);
  
  if (shootingStyle < 33 && playStyle < 50) {
    return {
      recommendations: [
        {
          name: "P28 (Toe Curve)",
          description: P28_DESCRIPTION,
          flex: flex,
          curve: "Mid-Toe Curve with Open Face",
          lie: lie,
          nhlers: ["Connor McDavid", "Jack Eichel", "Brendan Gallagher"],
          patterns: ["Bauer P28", "CCM P28", "Warrior W28", "TRUE TC4", "STX X28"]
        },
        {
          name: "P92 (Mid Curve)",
          description: P92_DESCRIPTION,
          flex: flex,
          curve: "Mid Curve with Slightly Open Face",
          lie: lie,
          nhlers: ["Alex Ovechkin", "Sidney Crosby", "Nicklas Backstrom"],
          patterns: ["Bauer P92", "CCM P29", "Warrior W03", "TRUE TC2", "STX X92"]
        },
        {
          name: "P88 (Mid Curve)",
          description: P88_DESCRIPTION,
          flex: flex,
          curve: "Standard Mid Curve",
          lie: lie,
          nhlers: ["Patrick Kane", "Nathan MacKinnon", "Henrik Zetterberg"],
          patterns: ["Bauer P88", "CCM P40", "Warrior W88", "TRUE MC", "STX X88"]
        }
      ]
    };
  } else if (shootingStyle > 66) {
    return {
      recommendations: [
        {
          name: "P92 (Mid Curve)",
          description: P92_DESCRIPTION,
          flex: flex + 10,
          curve: "Mid Curve with Open Face",
          lie: lie,
          nhlers: ["Alex Ovechkin", "Sidney Crosby", "Nicklas Backstrom"],
          patterns: ["Bauer P92", "CCM P29", "Warrior W03", "TRUE TC2", "STX X92"]
        },
        {
          name: "P88 (Mid Curve)",
          description: P88_DESCRIPTION,
          flex: flex + 5,
          curve: "Standard Mid Curve",
          lie: lie,
          nhlers: ["Patrick Kane", "Nathan MacKinnon", "Henrik Zetterberg"],
          patterns: ["Bauer P88", "CCM P40", "Warrior W88", "TRUE MC", "STX X88"]
        },
        {
          name: "P28 (Toe Curve)",
          description: P28_DESCRIPTION,
          flex: flex + 10,
          curve: "Mid-Toe Curve with Open Face",
          lie: lie,
          nhlers: ["Connor McDavid", "Jack Eichel", "Brendan Gallagher"],
          patterns: ["Bauer P28", "CCM P28", "Warrior W28", "TRUE TC4", "STX X28"]
        }
      ]
    };
  } else {
    return {
      recommendations: [
        {
          name: "P88 (Mid Curve)",
          description: P88_DESCRIPTION,
          flex: flex,
          curve: "Standard Mid Curve",
          lie: lie,
          nhlers: ["Patrick Kane", "Nathan MacKinnon", "Henrik Zetterberg"],
          patterns: ["Bauer P88", "CCM P40", "Warrior W88", "TRUE MC", "STX X88"]
        },
        {
          name: "P92 (Mid Curve)",
          description: P92_DESCRIPTION,
          flex: flex,
          curve: "Mid Curve with Open Face",
          lie: lie,
          nhlers: ["Alex Ovechkin", "Sidney Crosby", "Nicklas Backstrom"],
          patterns: ["Bauer P92", "CCM P29", "Warrior W03", "TRUE TC2", "STX X92"]
        },
        {
          name: "P28 (Toe Curve)",
          description: P28_DESCRIPTION,
          flex: flex,
          curve: "Mid-Toe Curve with Open Face",
          lie: lie,
          nhlers: ["Connor McDavid", "Jack Eichel", "Brendan Gallagher"],
          patterns: ["Bauer P28", "CCM P28", "Warrior W28", "TRUE TC4", "STX X28"]
        }
      ]
    };
  }
};