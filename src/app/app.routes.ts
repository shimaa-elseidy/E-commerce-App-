import { Routes } from '@angular/router';
import { authGaurdGuard } from './core/gaurds/auth-gaurd.guard';
import { blankGaurdGuard } from './core/gaurds/blank-gaurd.guard';
import { detailsResolver } from './core/gaurds/details.resolver';
import { registerGuard } from './core/gaurds/register.guard';

export const routes: Routes = [
    {
    path: '',
    loadComponent: () =>
        import('./layouts/auth-layout/auth-layout.component').then(
        (m) => m.AuthLayoutComponent
        ),
    canActivate: [authGaurdGuard],
    children: [
        { path: '', redirectTo: 'login', pathMatch: 'full' },
        {
        path: 'login',
        loadComponent: () =>
            import('./components/login/login.component').then(
            (m) => m.LoginComponent
            ),
        title: 'login🛒',
        },
        {
        path: 'register',
        loadComponent: () =>
            import('./components/register/register.component').then(
            (m) => m.RegisterComponent
            ),
        title: 'register 🛒',
        canDeactivate: [registerGuard],
        },
        {
        path: 'forgot',
        loadComponent: () =>
            import('./components/forgot-password/forgot-password.component').then(
            (m) => m.ForgotPasswordComponent
            ),
        title: 'reset password',
        },
    ],
    },
    {
    path: '',
    loadComponent: () =>
        import('./layouts/blank-layout/blank-layout.component').then(
        (m) => m.BlankLayoutComponent
        ),
    canActivate: [blankGaurdGuard],
    children: [
        { path: '', redirectTo: 'home', pathMatch: 'full' },
        {
        path: 'home',
        loadComponent: () =>
            import('./components/home/home.component').then(
            (m) => m.HomeComponent
            ),
        title: 'home 🛒',
        },
        {
        path: 'products',
        loadComponent: () =>
            import('./components/products/products.component').then(
            (m) => m.ProductsComponent
            ),
        title: 'products 🛒',
        },
        {
        path: 'cart',
        loadComponent: () =>
            import('./components/cart/cart.component').then(
            (m) => m.CartComponent
            ),
        title: 'cart 🛒',
        },
        {
        path: 'categories',
        loadComponent: () =>
            import('./components/categories/categories.component').then(
            (m) => m.CategoriesComponent
            ),
        title: 'categories 🛒',
        },
        {
        path: 'brands',
        loadComponent: () =>
            import('./components/brands/brands.component').then(
            (m) => m.BrandsComponent
            ),
        title: 'brands 🛒',
        },
        {
        path: 'details/:id',
        loadComponent: () =>
            import('./components/product-detail/product-detail.component').then(
            (m) => m.ProductDetailComponent
            ),
        title: 'details 🛒',
        resolve: { details: detailsResolver },
        },
        {
        path: 'Orders/:id',
        loadComponent: () =>
            import('./components/orders/orders.component').then(
            (m) => m.OrdersComponent
            ),
        title: 'visa order🛒',
        },
        {
        path: 'cash/:id',
        loadComponent: () =>
            import('./components/cash/cash.component').then(
            (m) => m.CashComponent
            ),
        title: 'cash order 🛒',
        },
        {
        path: 'cashDetails',
        loadComponent: () =>
            import('./components/cash-detail/cash-detail.component').then(
            (m) => m.CashDetailComponent
            ),
        title: 'cash order details🛒',
        },
        {
        path: 'allorders',
        loadComponent: () =>
            import('./components/all-orders/all-orders.component').then(
            (m) => m.AllOrdersComponent
            ),
        title: 'all orders 🛒',
        },
    ],
    },
    {
    path: '**',
    loadComponent: () =>
        import('./components/notfound/notfound.component').then(
        (m) => m.NotfoundComponent
        ),
    title: 'error',
    },
];
