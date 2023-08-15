<template>
  <div class="about-container">
    <div class="about-title">
      <h5 class="text-center">Acerca de</h5>
    </div>
    <div class="about-content">
      <p class="text-center text-black text-h6">
        Esta web app busca brindar una experiencia excepcional a nuestros usuarios.
        Con Quasar Framework hemos creado una interfaz web moderna y receptiva,
        Vue.js potencia componentes interactivos y una experiencia fluida, mientras
        que Spring Boot asegura un backend eficiente y escalable. Juntas, estas
        tecnologías forman una plataforma poderosa y confiable.
      </p>
    </div>
    <div class="row text-center">
      <div v-for="(card, index) in cards" :key="index" class="col-md-4 col-lg-4 col-xs-12 col-sm-12">
        <q-card @mouseover="hoverOver(index)" @mouseout="hoverOutTimeout(index)" class="my-card text-center box-shadow" flat bordered>
          <q-img :src="card.image" />

          <q-card-section>
           <div class="text-overline">{{ card.category }}</div>
            <div :class="card.headingClass" :style="'color: ' + card.headingColor" class="about-heading text-h6 q-mt-sm q-mb-xs">{{ card.title }}</div>
            <div class="text-caption text-grey-9">
              {{ card.description }}
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutPage',
  data() {
    return {
      cards: [
        {
          category: 'Frontend',
          title: 'Quasar Framework',
          description: 'Quasar es un framework que te permite construir sitios web responsivos, aplicaciones web progresivas (PWAs) y aplicaciones móviles utilizando Vue.js.',
          image: require('../assets/about_1.jpg'),
          headingClass: 'about-heading-1', // Define tus clases de título aquí
          headingColor: 'color-1', // Define tus colores de título aquí
        },
        {
          category: 'Frontend',
          title: 'Vue.js',
          description: 'Vue.js es un framework JavaScript progresivo para construir interfaces de usuario.',
          image: require('../assets/about_2.png'),
          headingClass: 'about-heading-2', // Define tus clases de título aquí
          headingColor: 'color-2', // Define tus colores de título aquí
        },
        {
          category: 'Backend',
          title: ' Spring Boot',
          description: 'Spring Boot es un framework de código abierto basado en Java para construir aplicaciones listas para producción.',
          image: require('../assets/about_3.png'),
          headingClass: 'about-heading-3', // Define tus clases de título aquí
          headingColor: 'color-3', // Define tus colores de título aquí
        },
      ],
    };
  },
  methods: {
    hoverOver(index) {
      // Cambiar las clases cuando el ratón está sobre la tarjeta
      this.cards[index].headingClass = 'hovered-heading'; // Cambia 'hovered-heading' por la clase que desees
      this.cards[index].headingColor = 'hovered-color'; // Cambia 'hovered-color' por el color que desees
    },
    hoverOutTimeout(index) {
      // Revertir las clases cuando el ratón sale de la tarjeta
      this.cards[index].headingClass = `about-heading-${index + 1}`; // Vuelve a la clase original
      this.cards[index].headingColor = `color-${index + 1}`; // Vuelve al color original
    },
  },
};
</script>

<style scoped lang="scss">
.about-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.about-title {
  margin-bottom: 20px;
}

.my-card {
  width: 100%;
  max-width: 250px;
  margin: 0 auto;
  flex-grow: 1;
  flex-basis: 0;
  max-height: 400px; /* Establece la altura máxima que desees */
  height: 330px;
  overflow: hidden; /* Oculta el contenido que exceda la altura máxima */
}

.about-heading {
  font-weight: bold;
}

.q-img {
  max-width: 100%;
}
.hovered-heading {
  /* Define los estilos cuando el ratón está sobre la tarjeta */
  font-weight: bold;
  color: rgb(11, 127, 199); /* Cambia el color a tu preferencia */
  font-size: 18px;
}
.about-content {
  text-align: center; /* Centra el contenido */
  max-width: 800px; /* Limita el ancho del párrafo */
  margin: 0 auto; /* Centra el contenedor */
}
.text-overline {
  font-size: 14px;
  color: #ff5100;
}
</style>