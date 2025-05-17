<script>
// @ts-nocheck

  import { router, Route } from 'tinro';
  import Navbar from './lib/Navbar.svelte';
  import ProjectsPage from './routes/Projects.svelte';
  import Homepage from './routes/Homepage.svelte';
  import CollectionsPage from './routes/Collections.svelte';
  import AboutPage from './routes/About.svelte';
  import ArticlesPage from './routes/Articles.svelte';
  import ContactPage from './routes/Contact.svelte';
</script>

<Navbar />

<!-- svelte-ignore component_name_lowercase -->
<router>
  <Route path="/">
    <Homepage />
  </Route>
  <Route path="/proiecte">
    <ProjectsPage />
  </Route>
  <Route path="/colectii">
    <CollectionsPage />
  </Route>
  <Route path="/despre-noi">
    <AboutPage />
  </Route>
  <Route path="/articole">
    <ArticlesPage />
  </Route>
  <Route path="/contact">
    <ContactPage />
  </Route>
</router>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }

  :global(#app) {
    margin: 0;
    padding: 0;
    width: 100%;
    overflow-x: hidden;
  }
</style> 