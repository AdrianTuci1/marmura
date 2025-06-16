<script>
// @ts-nocheck

  import { router, Route } from 'tinro';
  import { onMount } from 'svelte';
  import Navbar from './lib/Navbar.svelte';
  import PageWrapper from './lib/PageWrapper.svelte';
  import Preloader from './lib/Preloader.svelte';
  import ProjectsPage from './routes/Projects.svelte';
  import Homepage from './routes/Homepage.svelte';
  import CollectionsPage from './routes/Collections.svelte';
  import CollectionDetails from './routes/colectii/[id].svelte';
  import SlabDetails from './routes/colectii/[id]/[slabId].svelte';
  import AboutPage from './routes/About.svelte';
  import ArticlesPage from './routes/Articles.svelte';
  import ContactPage from './routes/Contact.svelte';
  import WishlistPage from './routes/Wishlist.svelte';

  let initialLoading = true;
  let pageLoading = false;

  onMount(() => {
    // Simulate initial loading
    setTimeout(() => {
      initialLoading = false;
    }, 1500);

    // Handle page transitions
    router.subscribe(() => {
      pageLoading = true;
      setTimeout(() => {
        pageLoading = false;
      }, 500);
    });
  });
</script>

<Preloader type="initial" show={initialLoading} />
<Preloader type="page" show={pageLoading} />

<Navbar />

<!-- svelte-ignore component_name_lowercase -->
<router>
  <Route path="/">
    <Homepage />
  </Route>
  <Route path="/proiecte">
    <PageWrapper>
      <ProjectsPage />
    </PageWrapper>
  </Route>
  <Route path="/colectii">
    <PageWrapper showFloatingBar={true}>
      <CollectionsPage />
    </PageWrapper>
  </Route>
  <Route path="/colectii/:id">
    <PageWrapper>
      <CollectionDetails />
    </PageWrapper>
  </Route>
  <Route path="/colectii/:id/:slabId">
    <PageWrapper>
      <SlabDetails />
    </PageWrapper>
  </Route>
  <Route path="/despre-noi">
    <PageWrapper>
      <AboutPage />
    </PageWrapper>
  </Route>
  <Route path="/articole">
    <PageWrapper>
      <ArticlesPage />
    </PageWrapper>
  </Route>
  <Route path="/contact">
    <PageWrapper>
      <ContactPage />
    </PageWrapper>
  </Route>
  <Route path="/wishlist">
    <PageWrapper>
      <WishlistPage />
    </PageWrapper>
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