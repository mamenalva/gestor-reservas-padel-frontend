# Reglas de Diseño — Gestor de Reservas de Pádel

Sistema visual basado en **Tailwind CSS v4 + DaisyUI v5** con tema personalizado `padel`.

---

## 1. Sistema de color

| Dónde usarlo | Clase DaisyUI / token CSS |
|---|---|
| Acción principal (botones CTA, énfasis) | `bg-primary` / `btn-primary` |
| Hover de elementos primarios | gestionado automáticamente por DaisyUI |
| Fondos de sección alternados | `bg-base-200` |
| Texto principal | `text-base-content` |
| Texto secundario / subtítulos / helpers | `text-base-content/55` |
| Mensajes de error | `alert-error` / `text-error` / `input-error` |
| Badges de estado positivo | `badge-success` |
| Badges de estado neutro | `badge-ghost` |

> **Regla de oro**: nunca escribir colores hex, rgb u oklch en JSX ni en archivos CSS propios.
> Usar siempre tokens DaisyUI (`bg-primary`, `text-error`…) o variables CSS de diseño (`var(--padel-green-*)`).

---

## 2. Tipografía

| Elemento | Clases |
|---|---|
| Heading de página | `text-2xl font-extrabold tracking-tight text-primary` |
| Heading de sección / card title | `text-xl font-bold text-base-content` |
| Subtítulo / descripción | `text-sm text-base-content/55` |
| Cuerpo de texto | `text-base text-base-content` |
| Label de formulario | `fieldset-legend font-medium` |
| Texto de enlace | `link link-primary font-semibold` |

- Fuente: sistema (`font-sans`, heredada de Tailwind).
- No definir `font-family` manualmente.

---

## 3. Componentes DaisyUI — clases canónicas

### Card

```html
<div class="card bg-base-100 shadow-xl">
  <div class="card-body gap-4">
    <h2 class="card-title text-base-content">Título</h2>
    <!-- contenido -->
    <div class="card-actions justify-end">
      <button class="btn btn-primary btn-sm">Acción</button>
    </div>
  </div>
</div>
```

### Formulario (DaisyUI v5)

```html
<form class="flex flex-col gap-4">
  <fieldset class="fieldset gap-1">
    <legend class="fieldset-legend font-medium">Label</legend>
    <input type="text" class="input input-bordered w-full" placeholder="…" />
    <!-- en estado error: añadir input-error -->
  </fieldset>
</form>
```

Variantes de input:
| Estado | Modificador |
|---|---|
| Normal | `input input-bordered w-full` |
| Error | añadir `input-error` |
| Disabled | atributo HTML `disabled` (DaisyUI aplica estilos automáticamente) |
| Focus | automático con `input-bordered` (no añadir ring extra) |

### Botones

| Caso de uso | Clases |
|---|---|
| Acción principal | `btn btn-primary` |
| Acción secundaria / outline | `btn btn-outline btn-primary` |
| Peligro / eliminar | `btn btn-error btn-outline btn-sm` |
| Con spinner de carga | `<span class="loading loading-spinner loading-sm" />` dentro + atributo `disabled` |
| Deshabilitado | atributo HTML `disabled` — nunca solo clase CSS |

### Alertas / mensajes de error

```html
<div role="alert" class="alert alert-error py-2.5 text-sm">
  <!-- SVG icono con aria-hidden="true" -->
  <span>Mensaje de error</span>
</div>
```

Tipos disponibles: `alert-error` · `alert-success` · `alert-warning` · `alert-info`.

### Badges

```html
<span class="badge badge-primary badge-sm">Activo</span>
<span class="badge badge-ghost badge-sm">Pendiente</span>
<span class="badge badge-error badge-sm">Cancelada</span>
```

### Spinner standalone

```html
<span class="loading loading-spinner loading-md text-primary" aria-label="Cargando" />
```

---

## 4. Layout y espaciado

- Padding de página interna: `px-4 py-6`
- Ancho máximo de contenido completo: `max-w-4xl mx-auto`
- Ancho máximo de formulario / card estrecha: `max-w-sm` (≈ `var(--form-max-w)`)
- Separación entre secciones: `gap-6` o `mb-6`
- Grid de cards: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4`
- Flex de acciones de toolbar: `flex flex-wrap items-center gap-3`

---

## 5. Fondos de página

| Página | Implementación |
|---|---|
| Login / Registro | clase `.auth-page` (gradiente verde oscuro, definido en `index.css`) |
| Páginas privadas (Pistas, Reservas) | `<main class="bg-base-200 min-h-screen px-4 py-6">` |
| HomePage hero | `bg-primary text-primary-content` o gradiente propio en CSS |
| 404 / error | `bg-base-200 min-h-screen` |

---

## 6. Estados interactivos

- **Hover**: DaisyUI gestiona los estados `-focus` internamente para `btn` e `input`. No añadir `hover:bg-*` manualmente sobre componentes DaisyUI.
- **Focus visible**: `input-bordered` añade el ring de foco automáticamente. No duplicar con `focus:ring-*`.
- **Disabled**: siempre via atributo HTML `disabled`. Nunca simular con solo clases CSS.
- **Loading**: `loading loading-spinner` dentro del botón + `disabled` en el botón padre.
- **Error de campo**: añadir clase `input-error` al `<input>` + mostrar `alert alert-error`.

---

## 7. Responsive (mobile-first)

- Diseñar sin prefijo primero (mobile), luego `sm:` / `md:` / `lg:`.
- Navbar: componente DaisyUI `navbar` + `drawer` o `dropdown` para menú móvil.
- Cards en lista: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4`.
- Formularios: `w-full max-w-sm` cuando están centrados; `w-full` dentro de grids.
- Tablas: envolver en `overflow-x-auto` para scroll horizontal en móvil.

---

## 8. Accesibilidad (mínimo requerido)

- Todo `<input>` necesita `id` y `<legend>` (o `<label htmlFor>`) asociado.
- Botones con solo icono: añadir `aria-label="Descripción"`.
- Alertas de error: añadir `role="alert"` para lectores de pantalla.
- Iconos decorativos dentro de botones/alertas: `aria-hidden="true"`.
- Imágenes decorativas: `alt=""`.
- Usar colores del tema `padel` que ya cumplen contraste WCAG AA.

---

## 9. Estructura de una página privada típica

```jsx
export function MiPagina() {
  return (
    <main className="bg-base-200 min-h-screen px-4 py-6">
      <div className="max-w-4xl mx-auto flex flex-col gap-6">

        {/* Cabecera de página */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-2xl font-extrabold tracking-tight text-primary">
            Título de Página
          </h1>
          <button className="btn btn-primary btn-sm">Acción Principal</button>
        </div>

        {/* Contenido */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body gap-4">
            {/* … */}
          </div>
        </div>

      </div>
    </main>
  );
}
```

---

## 10. Lo que NO hacer

| ❌ Prohibido | ✅ Alternativa |
|---|---|
| Colores hex/rgb en JSX o CSS | Tokens DaisyUI o `var(--padel-green-*)` |
| `style={{}}` para algo que Tailwind cubre | Clase Tailwind equivalente |
| Mezclar clases `.auth-form` legacy con DaisyUI | Usar solo DaisyUI + Tailwind |
| Crear clases CSS nuevas si Tailwind lo resuelve | Utilidad Tailwind directamente |
| `hover:bg-green-700` en un `btn btn-primary` | DaisyUI ya gestiona el hover |
| Comentarios explicando QUÉ hace el código | Nombres de componente/prop descriptivos |
| `disabled` solo con clase CSS | Atributo HTML `disabled` real |

---

## 11. Variables CSS disponibles (src/index.css)

```css
/* Tokens de layout */
--page-padding-x      /* 1rem   — padding horizontal de página */
--page-padding-y      /* 1.5rem — padding vertical de página */
--nav-height          /* 4rem   — altura del navbar */
--content-max-w       /* 64rem  — max-width de contenido */
--form-max-w          /* 24rem  — max-width de formularios */

/* Transiciones */
--transition-fast     /* 150ms ease */
--transition-normal   /* 250ms ease */
--transition-slow     /* 400ms ease */

/* Paleta verde padel */
--padel-green-50 … --padel-green-900
```

---

*Última revisión: 29 de abril de 2026*
