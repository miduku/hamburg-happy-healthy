<template lang="md">
  <header>
    <h1>Hamburg</h1>
    <h2>Glücklich & Gesund?</h2>
  </header>

  Hamburg gehört nicht nur zu den [glücklichsten](https://www.gluecksatlas.de), sondern laut gesetzlichen Vorgaben auch zu den am besten mit ärztlichen Einrichtungen versorgten Bundesländern Deutschlands. Die kassenärztliche Bundesvereinigung spricht in diesem Fall sogar von einer Überversorgung.

  Und dennoch: Trotz dieser Einordnung kommt es in einigen Teilen Hamburgs zu Engpässen in der Gesundheitsversorgung. [Einige Stadtteile weisen keine einzige Arztpraxis auf](https://www.abendblatt.de/hamburg/kommunales/article215837423/Hamburger-Aerzte-laufen-Sturm-gegen-Senatorin-Pruefer-Storcks.html).

  Welche Gemeinsamkeiten gibt es zwischen diesen Orten? Wie sieht die Verteilung der Gesundheitsinfrastruktur aus und wie lässt sie sich erklären?

  Wir – 7 Studierende der Fachhochschule Potsdam – sind diesen Fragen nachgegangen und unternehmen mithilfe offener Daten der Stadt Hamburg einen Erklärungsversuch.

  <p style="text-align: center;">
    <br>
    <button
      class="button is-outlined is-wide"
      @click.prevent="$emit('close-intro')"
    >
      Los geht’s!
    </button>
  </p>
</template>


<style lang="scss" scoped>
section {
  color: #fff;
  margin: 0 auto;
  width: 50%;
  max-width: $max-side-width;
  /* background: lightblue; */
  padding-bottom: $margin * 4;
  pointer-events: all;
}

header {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  flex-direction: column;
  margin-bottom: -5vw;
}

h1,
h2 {
  width: 100%;
  text-align: center;
}

h1 {
  font-size: $size-20 * 4;
  margin-bottom: $margin;
}

h2 {
  font-size: $size-24 + 0.2;
  font-family: 'Rubik', sans-serif;
  @extend %is-uppercased;
}

a {
  color: #fff;
  text-decoration: underline;
}
</style>
