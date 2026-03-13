import { defineMiddleware } from 'astro:middleware';
<<<<<<< HEAD

export const onRequest = defineMiddleware(async (context, next) => {
    // Solo protegemos las rutas que empiecen con /admin
    if (context.url.pathname.startsWith('/admin')) {
        const adminSession = context.cookies.get('admin_session');

        // Permitir acceso a la página de login si no hay sesión
        if (context.url.pathname === '/admin/login') {
            return next();
        }

        if (!adminSession || adminSession.value !== 'active') {
            return context.redirect('/admin/login');
        }
=======
import { query } from './lib/db';

export const onRequest = defineMiddleware(async (context: any, next: any) => {
    // Definimos las rutas que NO deben ser bloqueadas por mantenimiento
    const isPublicStatic = context.url.pathname.startsWith('/_astro') || context.url.pathname.startsWith('/favicon');
    const isMaintenancePage = context.url.pathname === '/mantenimiento';
    const isAdmin = context.url.pathname.startsWith('/admin');
    const isApi = context.url.pathname.startsWith('/api');

    // Consulta real a la base de datos
    let isMaintenanceActive = false;
    try {
        const result = await query("SELECT value FROM site_settings WHERE key = 'maintenance_mode'");
        if (result && result.rows && result.rows.length > 0) {
            isMaintenanceActive = result.rows[0].value === 'true';
        }
    } catch (e) {
        console.error('Error consultando mantenimiento en DB:', e);
    }

    if (isMaintenanceActive && !isMaintenancePage && !isAdmin && !isApi && !isPublicStatic) {
        return context.redirect('/mantenimiento');
>>>>>>> 194a018340e3ffa41f9f2714b64c01e9779ce8a2
    }

    return next();
});
