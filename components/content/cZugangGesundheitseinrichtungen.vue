<template lang="md">
  ## Wie ist der Zugang zu Gesundheits&shy;einrichtungen in Hamburg?

  Um den Zugang zur Hamburger Gesundheitsversorgung bewerten zu können, haben wir die räumliche Verteilung von _Krankenhäusern_, _Allgemeinmediziner*innen_, _Zahnärzt*innen_, und _niedergelassenen Ärzt*innen_  berücksichtigt. Letztere umfassen neben weiteren auch Facharztsitze von Neurolog\*innen, Urolog\*innen oder Augenärzt\*innen. Neben den ärztlichen Einrichtungen betrachten wir zusätzlich Apotheken und Physiotherapeut\*innen, welche nicht Teil der staatlichen Bedarfsplanung sind.

  Die Daten zu den verschiedenen Einrichtungen wurden 2017 durch das Statistikamt Nord und der Stadt Hamburg erhoben. Weiche Standortfaktoren wie Parks oder stark befahrene Straßen, welche ebenfalls Einfluss auf die Gesundheit haben, wurden nicht berücksichtigt.

  ### Was bedeutet „Zugang“?

  Zur Vergleichbarkeit der Stadtteile, die sich natürlich in der Einwohnerzahl unterscheiden, haben wir die Anzahl der Gesundheitseinrichtungen ins Verhältnis zu der Einwohnerzahl in einem Stadtteil  gesetzt. Damit lässt sich eine Aussage über den <Tt title="Zugang zu Gesundheitseinrichtungen:" :content="info.gesundheitseinrichtungen">„Zugang zu Gesundheitseinrichtungen“</Tt> in einem Stadtteil treffen.

  Um ein präzises Bild über die Verteilung  der gesundheitliche Versorgungs in den Hamburger Stadtteilen zu erhalten, haben wir einen vergleichsweise strengen <Tt title="Festlegung der Grenzwerte:" :content="info.grenzwerte">Grenzwert von 289</Tt> Einwohner\*innen pro Gesundheitseinrichtung festgelegt, der der durchschnittlichen ärztlichen Versorgung in Deutschland [entspricht](https://www.bundesaerztekammer.de/fileadmin/user_upload/downloads/pdf-Ordner/Statistik2017/Stat17AbbTab.pdf). Da Hamburg mit durchschnittlich 139 Einwohner\*innen pro ärztlicher Einrichtung statistisch gesehen stark überversorgt ist, wird ein Stadtteil mit einem Wert über 289 als hier als niedrig versorgt definiert. Stadtteile mit weniger als 139 Einwohner\*innen pro Gesundheitseinrichtung gelten als hoch versorgt.

  ### So sieht der Zugang in Hamburg aus

  Bei der Betrachtung des Hamburger Planungsgebiets nach Stadtteilen offenbart sich ein diverses Bild. Insgesamt verfügen 14 Stadtteile über keine einzige Arztpraxis, wie zum Beispiel der viertkleinste Stadtteil Langenbek, Wohldorf-Ohlstedt oder Billwerder. Die meisten dieser Stadtteile sind eher dünn besiedelte Gebiete in Randlagen mit zum Teil geringer Einwohnerzahl. Rechnet man alle Gesundheitseinrichtungen wie Krankenhäuser, Apotheken und niedergelassene Ärzt*innen zusammen, gibt es noch 9 Stadtteile ohne Gesundheitseinrichtungen. Die Stadtteile im Zentrum sind überwiegend gut versorgt, es gibt jedoch Ausnahmen — beispielsweise Veddel oder Borgfelde.

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
          `Der Zugang wurde berechnet, indem die Anzahl der Einwohner*innen in einem Stadtteil mit der Anzahl der Gesundheitseinrichtungen dividiert wurde. Eine hohe Verhältniszahl bedeutet, dass eine Einrichtung für mehr Einwohner*innen zuständig ist als bei einer geringen Verhältniszahl. Deshalb gilt: Je höher die Zahl, desto schlechter der Zugang und umgekehrt.`
        ],
        grenzwerte: [
          [
            `<strong>Keine Gesundheitseinrichtungen</strong>: <br>Stadtteile ohne Gesundheitseinrichtung`,
            `<strong>Niedrige Versorgung</strong>: <br>Stadtteile mit über 289 Einwohner*innen pro Gesundheitseinrichtung`,
            `<strong>Normale Versorgung</strong>: <br>Stadtteile mit 139–289 Einwohner*innen pro Gesundheitseinrichtung`,
            `<strong>Hohe Versorgung</strong>: <br>Stadtteile mit unter 139 Einwohner*innen pro Gesundheitseinrichtungen`
          ]
        ]
      }
    }
  }
}
</script>
