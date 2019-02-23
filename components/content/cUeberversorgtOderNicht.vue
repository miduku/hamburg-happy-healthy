<template lang="md">
  ## Hamburg — überversorgt?

  <!-- Visualisierung / Website: Karte auf ganz Hamburg, als ein Planungsgebiet dargestellt -->

  Bisher werden Großstädte wie Hamburg in der Bedarfsplanung als ein Planungsraum betrachtet - ohne Untergliederung. Obwohl Hamburg laut den offiziellen Zahlen als überversorgt gilt, hat sich in der Vergangenheit gezeigt, dass insbesondere Fachärzt*innen vermehrt in Stadtteilen mit niedrigem Durchschnittseinkommen, beispielsweise in Wilhelmsburg oder Billstedt, [fehlen](https://www.abendblatt.de/hamburg/kommunales/article215837423/Hamburger-Aerzte-laufen-Sturm-gegen-Senatorin-Pruefer-Storcks.html). Doch auch aus Stadtteilen mit mittlerem und hohem Durchschnittseinkommen gab es 2018 Beschwerden von Eltern, wonach es zu wenig Kinderarztpraxen vor Ort gebe.  Die Niederlassungssperre sorgt in dem Fall dafür, dass trotz bestehendem Ärztemangel nur in Ausnahmefällen neue Arztniederlassungen in unterversorgten Stadtteilen [genehmigt](https://www.welt.de/regionales/hamburg/article172367729/Hamburg-Weitere-Kinderaerzte-sollen-Notstand-beheben.html) werden.

  Um diesem Widerspruch nachzugehen, haben wir untersucht, nach welchen Kriterien sich die ärztliche Versorgung im Planungsgebiet Hamburg verteilt und wie ausgeprägt diese ist. Den öffentlichen Diskurs aufgreifend, beleuchten wir mit den offenen Daten Hamburgs einerseits den Zugang zu Gesundheitseinrichtungen und andererseits das durchschnittliche Einkommen der Stadtteilbewohner*innen.

  Niemand ist dazu verpflichtet eine ärztliche Einrichtung innerhalb der Stadtteilgrenzen aufzusuchen, was als Annahme unserer Analyse zugrunde liegt. Jedoch lässt die Betrachtungsebene der Stadtteile Aussagen zur räumlichen Verteilung der gesundheitlichen Versorgung zu. Auch aufgrund der in Hamburg herrschenden ökonomischen Ungleichheit zwischen den Stadtteilen lohnt sich ein Blick auf diese räumliche Ebene. So ist beispielsweise das Durchschnittseinkommen in Blankenese <Tt title="Hamburg ist in Bezug auf die Einkommensverteilung das ungleichste Bundesland:" :content="info.einkommensverteilung">mehr als sieben mal höher</Tt> als in Veddel.

  Zudem entwickeln einige Stadtteile ganz spezifische Lösungen, um die mangelnde Versorgung anzugehen.
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
        einkommensverteilung: [
          `Laut dem Gini-Koeffizient, einem statistischen Maß zur Berechnung von <a href="http://www.amtliche-sozialberichterstattung.de/A3gini-koeffizient.html" target="_blank">Einkommensungleichheit</a>, welches jährlich für jedes Bundesland errechnet wird, ist Hamburg mit einem Wert von 0,32 -0,33 das Land mit der höchsten Einkommensungleichheit. Der Bundesdurchschnitt lag 2017 bei 0,29.`
        ]
      }
    }
  }
}
</script>
