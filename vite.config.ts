import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    include: [
      'lit',
      '@lit/context',
      '@lit/task'
    ]
  }
});