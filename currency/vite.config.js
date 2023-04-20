import reactRefresh from '@vitejs/plugin-react-refresh';
import laravel from 'laravel-vite-plugin';

export default ({ command }) => ({
    base: command === 'serve' ? '' : '/build/',
    plugins: [
        laravel([
            'resources/css/app.css',
            'resources/js/app.js',
        ]),
        reactRefresh(),
    ],
});