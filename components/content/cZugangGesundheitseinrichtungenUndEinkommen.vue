<template lang="md">
  ## Zugang zu Gesundheits&shy;einrichtungen … und Einkommen?

Wir greifen im Folgenden die in Hamburg bereits fortgeschrittene Diskussion um die Verteilung der Gesundheitseinrichtungen nach Einkommen auf. Die Karte zeigt nun eine Visualisierung der Hamburger Stadtteile nach Einkommen. Die Einwohner*innen von Steinwerder und Kleiner Grasbrook hatten 2013 mit 13.777 € pro Jahr durchschnittlich das niedrigste Einkommen. In Nienstedten lag das durchschnittliche Jahreseinkommen 2013 bei 120.716 €.

Die Stadtteile haben wir nach Einkommen in drei Gruppen eingeteilt: Stadtteile der oberen, mittleren und unteren Einkommensschicht. Die Stadtteile der oberen Einkommensgruppe ist gleichzeitig auch die mit der geringsten Anzahl an Einwohnern. 18% der Bevölkerung Hamburgs leben dort. 36% der Einwohner Hamburgs verteilen sich in den Stadtteilen der mittleren Einkommensgruppe. Die Mehrzahl der Hamburger wohnt in Gebieten der unteren Einkommensgruppe mit einem Anteil von 46%.
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
        einkommen: [
          `Die Einkommensdaten entstammen der Lohn- und Einkommensstatistik, welche 2013 das letzte mal erhoben wurde. Sie visualisieren das jährliche Durchschnittseinkommen der Stadtteile.`,
          `Sie stammen nicht aus dem selben Jahr wie die erfassten Daten über die Gesundheitseinrichtiungen (2017). Um dennoch eine Aussage über einen möglichen Zusammenhang zwischen dem Zugang der Gesundheitseinrichtungen und dem Einkommen eines Stadtteils treffen zu können, wurde auf diese Daten zurückgegriffen.`
        ],
        gruppen: [
          `Auf Grundlage des Medianeinkommens aus dem Jahr 2016, welches bei ca. 1.600€ pro Monat lag, haben wir die Hamburger Stadtteile in drei Einkommensgruppen eingeteilt:`,
          [
            `Gruppe 1 repräsentiert die obere Einkommensschicht, mit einem durchschnittlichen Jahreseinkommen der Einwohner von mehr als dem 2,5-fachen des Medianeinkommens (>48.000 €) jährlich.`,
            `Die Einwohner der Stadtteile in Gruppe 2 verfügen durchschnittlich über das 1,6- bis 2,5-fache des Medianeinkommens und sind somit die mittlere Einkommensschicht (>32.000 - 48.000 € jährlich).`,
            `Gruppe 3 stellt die untere Einkommensschicht (<32.000 € jährlich) dar.`
          ]
        ]
      }
    }
  }
}
</script>
