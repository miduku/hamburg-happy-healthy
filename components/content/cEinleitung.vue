<template lang="md">
  ## Einleitung

  ### Wer macht die Regeln?

  Die Entscheidung in welcher Gegend eine Medizinerin oder ein Mediziner eine Arztpraxis eröffnet ist auf den ersten Blick eine freiwillige. Schaut man jedoch etwas genauer auf die verschiedenen Regularien, die bei einer solchen Entscheidung eine Rolle spielen, wird das Bild schon komplexer. Denn die Verteilung ärztlicher Versorgungseinrichtungen wird in Deutschland durch die sogenannte Bedarfsplanung geregelt, um Zugang und Qualität zu medizinischem Fachpersonal sicherzustellen. Der Gesetzgeber kontrolliert die Richtlinien der Bedarfsplanung, die Planung selbst funktioniert hingegen nach dem Prinzip der gemeinsamen <Tt :content="info.selbstverwaltung">Selbstverwaltung</Tt>.

  Damit [unterscheidet](http://www.bpb.de/politik/innenpolitik/gesundheitspolitik/72906/gesundheitswesen-im-europaeischen-vergleich) sich das deutsche einerseits von rein staatlich regulierten und finanzierten Gesundheitssystemen, wie beispielsweise das in Großbritannien oder Italien und andererseits von Gesundheitssystemen deren Leistungen vornehmlich durch privatwirtschaftliche Akteure bereitgestellt werden wie beispielsweise das der USA. Ärztinnen und Ärzte in Deutschland müssen sich folglich bei der Suche nach einem Arztsitz an den Regularien orientieren, die die Bedarfsplanung vorsieht.

  ### Wo darf eine neue Praxis eröffnen?

  Geographisch erfolgt die Bedarfsplanung in fest definierten Planungsgebieten, welche meist der Größe der Landkreise entsprechen. Abhängig von der Anzahl der dort bereits praktizierenden Ärztinnen und Ärzte sind diese entweder für neue Zulassungen offen oder gesperrt. Steigt die Versorgung auf über 110%, werden keine neuen Niederlassungen mehr genehmigt und frei werdende Arztsitze nicht neu besetzt. Die Schaffung neuer Niederlassungen ist dann nur in Ausnahmefällen über lokale Zulassungsausschüsse möglich.
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
        selbstverwaltung: [
          `Die föderal organisierten kassenärztlichen und kassenzahnärztlichen Vereinigungen sowie die gesetzlichen Krankenkassen und die Deutsche Krankenhausgesellschaft sind im Rahmen der formulierten Richtlinien dafür zuständig, „flächendeckende, wohnortnahe vertragsärztliche Versorgung der Bevölkerung zu gewährleisten und Fehlversorgung zu vermeiden“ (<a href="http://www.kbv.de/html/bedarfsplanung.php" target="_blank">KBV</a>). `
        ]
      }
    }
  }
}
</script>
