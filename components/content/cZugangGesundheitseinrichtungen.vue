<template lang="md">
  ## Zugang zu Gesundheits&shy;einrichtungen

  Um den Zugang zu Gesundheitseinrichtungen zu definieren, haben wir weiche Standortfaktoren wie Parks und Umwelteigenschaften vernachlässigt. Als Gesundheitseinrichtung betrachten wir deshalb im folgenden Krankenhäuser, Apotheken, Allgemeinmediziner, Zahnärzte, Physiotherapeuten und niedergelassene Ärzte. Letztere enthalten alle Fachärzte wie zum Beispiel Neurolog\*innen, Urolog\*innen oder Augenärzt\*innen.

  Um die Stadtteile, welche sich hinsichtlich der Einwohnerzahl unterscheiden, miteinander vergleichbar zu machen, arbeiten wir nicht mit absoluten Zahlen, sondern mit einer Verhältniszahl, die wir im Folgenden <Tt title="Zugang zu Gesundheitseinrichtungen:" :content="info.gesundheitseinrichtungen">„Zugang zu Gesundheitseinrichtungen“</Tt> nennen.

  Um eine Bewertung vornehmen zu können, haben wir einen <Tt title="Festlegung der Grenzwerte:" :content="info.grenzwerte">Grenzwert von 289 Einwohnern</Tt> pro Gesundheitseinrichtung definiert. Muss ein Arzt mehr als 289 Einwohner pro Stadtteil versorgen, gilt der Stadtteil als unterversorgt. Nach unserer Definition ist eine Verhältniszahl von 289 Einwohnern pro Gesundheitseinrichtung erstrebenswert.

</template>


<script>
import Tt from '~/components/BaseTooltip'

export default {
  components: {
    Tt
  },

  data() {
    return {
      info: {
        gesundheitseinrichtungen: [
          `Den Zugang haben wir berechnet, indem wir die Anzahl der Einwohner in einem Stadtteil mit der Anzahl der Gesundheitseinrichtungen dividiert haben. Eine hohe Verhältniszahl bedeutet, dass eine Einrichtung für mehr Einwohner zuständig ist als bei einer geringen Verhältniszahl. Deshalb gilt: je höher die Zahl, desto schlechter der Zugang und umgekehrt.`
        ],
        grenzwerte: [
          `Der Richtwert von 289 Einwohnern pro Gesundheitseinrichtung richtet sich nach der durchschnittlichen Anzahl der Einwohner pro Arzt in Deutschland (2017). Da Hamburg mit einem Durchschnittswert von 139 Einwohnern pro Arzt besser versorgt ist als der Rest der Republik, bezeichnen wir Stadtteile, die über dem Bundesdurchschnitt (289 Einwohner pro Arzt) liegen, relativ gesehen als unterversorgt.  Wir berücksichtigen neben niedergelassenen Ärzten zusätzlich jedoch Apotheken und Physiotherapeuten, die in der staatlichen Bedarfsplanung eigentlich nicht berücksichtigt werden.`,
          `Stadtteile, die 139–289 Einwohner pro Gesundheitseinrichtung aufweisen, gelten laut unserer Definition als normal versorgt. Stadtteile mit weniger als 139 Einwohnern pro Gesundheitseinrichtung, dem Hamburger Durchschnittswert, definieren wir als überversorgt:`,
          [
            `Keine Gesundheitseinrichtungen: Stadtteile ohne Gesundheitseinrichtung`,
            `Unterversorgt: Stadtteile mit über 289 Einwohnern pro Gesundheitseinrichtung`,
            `Normal versorgt: Stadtteile mit 139–289 Einwohnern pro Gesundheitseinrichtung`,
            `Überversorgt: Stadtteile mit unter 139 Einwohnern pro Gesundheitseinrichtungen`
          ],
          `Unterteilt man das Planungsgebiet Hamburg nach Stadtteilen, offenbart sich ein diverses Bild. Insgesamt verfügen 14 Stadtteile über keinen einzigen niedergelassenen Arzt, wie zum Beispiel der viertkleinste Stadtteil Langenbek, Wohldorf-Ohlstedt oder Billwerder. Die meisten dieser Stadtteile sind eher dünn besiedelte Gebiete in Randlagen mit zum Teil geringer Einwohnerzahl. Rechnet man alle Gesundheitseinrichtungen wie Krankenhäuser, Apotheken und niedergelassene Ärzte zusammen, gibt es noch 9 Stadtteile ohne Gesundheitseinrichtungen. Die Stadtteile im Zentrum sind überwiegend gut versorgt, es gibt jedoch Ausnahmen, beispielsweise Veddel oder Borgfelde.`
        ]
      }
    }
  }
}
</script>
