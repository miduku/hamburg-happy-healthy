<template lang="md">
  ## Welche Rolle spielt das Einkommen?

  ### Ist der Zugang zu Gesundheitseinrichtungen in Stadtteilen mit einem höheren Einkommen tatsächlich besser? 

  Die Karte zeigt die <Tt title="„Einkommen“" :content="info.einkommenverteilung">Einkommensverteilung</Tt> der 104 Stadtteile Hamburgs. Die Einwohner*innen in Steinwerder und Kleiner Grasbrook hatten 2013 mit durchschnittlich 13.777 € pro Jahr das niedrigste Einkommen. In Nienstedten war das durchschnittliche Jahreseinkommen 2013 mit 120.716 € am höchsten.


  ### Unterteilung nach Einkommensgruppen 
  
  Die Stadtteile wurden in <Tt :content="info.einkommensgruppen">drei Einkommensgruppen</Tt> eingeteilt: Stadtteile der oberen, mittleren und unteren Einkommensgruppe. Die obere Einkommensgruppe ist gleichzeitig auch die mit der geringsten Anzahl an Einwohner*innen: 18% der Bevölkerung Hamburgs leben dort. 36% der Einwohner\*innen Hamburgs verteilen sich in den Stadtteilen der mittleren Einkommensgruppe. Die Mehrzahl der Hamburger\*innen wohnt in Gebieten der unteren Einkommensgruppe mit einem Anteil von 46% an der Gesamtbevölkerung.
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
        einkommenverteilung: [
          `Die Einkommensdaten zum jährlichen Durchschnittseinkommen entstammen der Lohn- und Einkommensstatistik, welche 2013 auf Stadtteilebene erhoben wurde. Sie wurden nicht im selben Jahr erhoben, wie die Daten über die Gesundheitseinrichtungen (2017).`
        ],
        einkommensgruppen: [
          `Auf Grundlage des Medianeinkommens aus dem Jahr 2016, welches bei ca. 1.600€ pro Monat lag, haben wir die Hamburger Stadtteile in drei Einkommensgruppen eingeteilt:`,
          [
            `Gruppe 1 repräsentiert die obere Einkommensgruppe, mit einem durchschnittlichen Jahreseinkommen der Einwohner*innen von mehr als dem 2,5-fachen des Medianeinkommens (mehr als 48.000 €) jährlich.`,
            `Die Einwohner*innen der Stadtteile in Gruppe 2 verfügen durchschnittlich über das 1,6- bis 2,5-fache des Medianeinkommens und bilden damit die mittlere Einkommensgruppe (32.000 bis 48.000 € jährlich).`,
            `Gruppe 3 stellt die untere Einkommensgruppe (weniger als 32.000 € jährlich) dar. `
          ]
        ]
      }
    }
  }
}
</script>
