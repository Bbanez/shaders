import App from './App.svelte';
import './styles/_main.scss';

const app = new App({
  target: document.getElementById('app') as HTMLElement,
});

export default app;
