<template lang="md">
  ## Stadtteile der Einkommensgruppen

  ### Obere Einkommensgruppe

  ![Stadtteile mit hohem Einkommen](/pics/bar-hohes-einkommen.svg)
  ![Legende](/pics/bar-legende.svg)

  Zunächst betrachten wir die Stadtteile mit einem Durchschnittseinkommen von über 48.000 € und werfen einen Blick auf die dortige gesundheitliche Versorgung. Die Karte zeigt die 23 Stadtteile, welche in diese Einkommensgruppe fallen.

  Drei Viertel der Stadtteile der oberen Einkommensschicht sind normal versorgt. Dabei ist beinahe ein Drittel sogar überversorgt. 25% der Stadtteile kommen auf mehr als 289 Einwohner pro Gesundheitseinrichtung und sind nach unserer Definition unterversorgt. Auffällig ist, dass die unterversorgten Gebiete dieser Gruppe sich im  äußeren nordwestlichen Bezirk Wandsbek gruppieren: Lehmsahl-Mellingstedt, Bergstedt, Wohldorf-Ohlstedt und Sasel weisen mehr als 289 Einwohner pro Gesundheitseinrichtung auf.

  ### Mittlere Einkommensgruppe

  ![Stadtteile mit mittlerem Einkommen](/pics/bar-mittleres-einkommen.svg)
  ![Legende](/pics/bar-legende.svg)

  Die Visualisierung zeigt die Stadtteile mit einem Durchschnittseinkommen von über 32.000 € und unter 48.000 € und die dortige gesundheitlichen Versorgung. Insgesamt ist diese Gruppe mit 41 vertretenen Stadtteilen am größten.

  Die Gruppe der Stadtteile der mittleren Einkommensschicht weist mit 12% den höchsten Anteil an Stadtteilen auf, die keine Gesundheitseinrichtungen haben. Darunter die Stadtteile Tatenberg, Spadenland, Moorburg und Altenwerder. Mehr als 60% der Stadtteile sind nach unserer Definition unterversorgt. Nur 25% davon verfügen über eine normale Versorgung, wobei 2 Stadtteile überversorgt sind.

  ### Untere Einkommensgruppe

  ![Stadtteile mit unterem Einkommen](/pics/bar-unteres-einkommen.svg)
  ![Legende](/pics/bar-legende.svg)

  Die Stadtteile, deren Einwohner mit unter 32.000 € durchschnittlich das geringste Einkommen in Relation zur Hamburger Gesamtbevölkerung aufweisen, werden als letztes dargestellt. Die Gruppe umfasst 35 Stadtteile und hat mit 77% den höchsten Anteil an unterversorgten Gebieten.

  Im Vergleich zu der mittleren Einkommensgruppe sind jedoch mit Billbrook und Billwerder drei Stadtteile weniger vertreten, die keine Gesundheitseinrichtungen haben. 9% der Stadtteile weisen eine Überversorgung auf, 8% der Stadtteile gelten nach unserer Definition als normal versorgt.

  ### Wie hängen Einkommen und Zugang nun zusammen?

  ![Stadtteile mit hohem Einkommen](/pics/bar-hohes-einkommen.svg)
  ![Stadtteile mit mittlerem Einkommen](/pics/bar-mittleres-einkommen.svg)
  ![Stadtteile mit unterem Einkommen](/pics/bar-unteres-einkommen.svg)
  ![Legende](/pics/bar-legende.svg)

  Obwohl in der unteren Einkommensgruppe die Mehrzahl der Hamburger*innen leben, ist der Zugang zur Gesundheitsinfrastruktur nach unseren Grenzwerten schlechter zu bewerten. Jedoch gibt es auch hier feine Unterschiede innerhalb der Einkommensgruppen. So ist auch in Stadtteilen mit einem höheren Durchschnittseinkommen zu beobachten, dass sich die Versorgung verschlechtert, je peripherer die Stadtteile verortet sind. Auch der Anteil der Stadtteile, welche über keine einzige Gesundheitseinrichtungen verfügen ist nicht in der untersten, sondern in der mittleren Einkommensgruppe am höchsten.

  //... (still needs reviewing)
  Grundsätzlich bestätigt sich jedoch der öffentliche Eindruck, wonach der Zugang zu Gesundheitseinrichtungen zu einem gewissen Grad in Verbindung mit dem Einkommen der Bewohner*innen steht.  Auch wenn die von uns festgelegten WEinkommens- und Versorgungswerte eine sehr strenge Auslegung der Gesundheitsversorgung darstellen.  -kann  der Vergleich zwischen den Einkommensgruppen bei der Bewertung der gegenwärtigen Bedarfsplanung hilfreich sein.

  ### Was sind die Gründe dafür, dass das System der Bedarfsplanung an dieser Stelle versagt?

  Ein Grund, der immer wieder von Kritikern des gegenwärtigen Systems angeführt wird, ist die Festlegung der Planungsräume: Diese seien für eine bedarfsorientierte Planung schlicht zu groß, um strukturelle Unterschiede innerhalb des Gebiets zu adressieren und auszugleichen. Der Vorsitzende der Kassenärztlichen Vereinigung Hamburgs, Walter Plassmann betont jedoch auch die politische Dimension des Ärztemangels: das Problem der Unterversorgung sei auch damit zu erklären, dass Ärzt*innen bei der Behandlung von gesetzlich Versicherten nur 80 Prozent ihres Honorars ausgezahlt bekämen und damit folglich auf Privatversicherte angewiesen seien. Folglich verteilen sich in Hamburg nicht nur private, sondern auch staatlich regulierte Gesundheitseinrichtungen zunehmend anhand wirtschaftlicher Kriterien.
  ...//
</template>


<script>
import Tt from '~/components/BaseTooltip'

export default {
  components: {
    Tt
  },

  data() {
    return {
      info: {}
    }
  }
}
</script>
