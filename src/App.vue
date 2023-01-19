<template>

  <!--
    navigation menu
  -->
  <ul id="navMenu">
    <!--
      menu icon
    -->
    <li id="menuIcon"><img src="./assets/menu.svg"></li>

    <!--
      page links
    -->
    <div id="pages">
      <router-link to="/about"><li><a>About Me</a></li></router-link>
      <router-link to="/experience"><li><a>Experience</a></li></router-link>
      <router-link to="/motivation"><li><a>Motivation</a></li></router-link>
      <router-link to="/demos"><li><a>Code Demos</a></li></router-link>
    </div>
  </ul>
  <!--
    necessary to display component linked to by router-link tags
  -->
  <router-view></router-view>
</template>

<script>
  export default {
    name: "App",
  };
</script>