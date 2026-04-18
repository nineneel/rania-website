# Linktree API Documentation

API specification untuk halaman Linktree RANIA.

**Frontend reference:** [src/pages/Linktree/Linktree.jsx](../../src/pages/Linktree/Linktree.jsx)

---

## Decisions Summary

| # | Topic | Decision |
|---|---|---|
| 1 | Multi-language | **No** (untuk sekarang) — single language string saja |
| 2 | CMS Admin Panel | **Yes** — managed via admin dashboard |
| 3 | Avatar / Icon | **Reuse existing files** — cukup URL string, tidak perlu upload baru |
| 4 | Click Tracking | **Yes** — track klik per link |
| 5 | Endpoint Strategy | **Combined** — single endpoint return semua data |

---

## 1. Public API Endpoint

### `GET /api/linktree`

Mengembalikan seluruh data yang dibutuhkan halaman Linktree dalam satu request.

**Method:** `GET`
**Auth:** Public (tidak perlu auth)
**Cache:** Recommended 5–15 menit (data jarang berubah)

#### Response 200

```json
{
  "success": true,
  "data": {
    "profile": {
      "name": "RANIA",
      "tagline": "Redefine Hajj, Reimagined Journey",
      "avatar_url": "https://cdn.rania.co.id/icons/rania-logo.webp"
    },
    "links": [
      {
        "id": 1,
        "title": "Official Website",
        "url": "https://www.rania.co.id",
        "order": 1
      },
      {
        "id": 2,
        "title": "Hajj Packages",
        "url": "https://www.rania.co.id/hajj",
        "order": 2
      },
      {
        "id": 3,
        "title": "Umrah Packages",
        "url": "https://www.rania.co.id/umrah",
        "order": 3
      }
    ],
    "social_media": [
      {
        "id": 1,
        "name": "Instagram",
        "url": "https://instagram.com/rania",
        "icon_url": "https://cdn.rania.co.id/icons/Instagram.svg"
      }
    ]
  }
}
```

#### Notes

- `links` harus sudah ter-sort berdasarkan `order ASC`.
- Hanya return record dengan `is_active = true`.
- `social_media` reuse data dari endpoint `/api/social-media` yang sudah ada — di-include disini supaya frontend cukup 1x request.

#### Response 500 (Error)

```json
{
  "success": false,
  "message": "Failed to fetch linktree data"
}
```

---

## 2. Click Tracking Endpoint

### `POST /api/linktree/links/{id}/click`

Track click event setiap kali user mengklik salah satu link.

**Method:** `POST`
**Auth:** Public
**Rate Limit:** Recommended (misal 60 req/menit per IP) untuk mencegah spam.

#### Request

```
POST /api/linktree/links/1/click
```

Body kosong. Server membaca metadata dari request headers:
- `User-Agent` → device/browser info
- `Referer` → asal traffic
- IP address → untuk lokasi (opsional)

#### Response 200

```json
{
  "success": true,
  "message": "Click recorded"
}
```

#### Response 404

```json
{
  "success": false,
  "message": "Link not found"
}
```

#### Implementation Note

Endpoint ini harus **fire-and-forget** dari sisi frontend — tidak boleh memblokir navigasi user. Frontend akan memanggil endpoint ini secara async lalu langsung redirect ke target URL.

---

## 3. Database Schema

### Table: `linktree_profile`

Single-row table (atau bisa disimpan di tabel `settings` general jika sudah ada).

| Column | Type | Constraint | Description |
|---|---|---|---|
| `id` | bigint unsigned | PK, AI | |
| `name` | varchar(100) | NOT NULL | Nama brand (contoh: "RANIA") |
| `tagline` | varchar(255) | NOT NULL | Tagline brand |
| `avatar_url` | varchar(500) | NOT NULL | URL gambar avatar/logo |
| `is_active` | boolean | default `true` | Toggle visibility |
| `created_at` | timestamp | | |
| `updated_at` | timestamp | | |

### Table: `linktree_links`

| Column | Type | Constraint | Description |
|---|---|---|---|
| `id` | bigint unsigned | PK, AI | |
| `title` | varchar(100) | NOT NULL | Teks button |
| `url` | varchar(500) | NOT NULL | Target URL |
| `order` | int unsigned | default `0`, INDEX | Urutan tampil (ASC) |
| `is_active` | boolean | default `true` | Toggle visibility |
| `click_count` | int unsigned | default `0` | Cache total klik (untuk display cepat di CMS) |
| `created_at` | timestamp | | |
| `updated_at` | timestamp | | |

### Table: `linktree_link_clicks`

Detail per-event click untuk analytics.

| Column | Type | Constraint | Description |
|---|---|---|---|
| `id` | bigint unsigned | PK, AI | |
| `linktree_link_id` | bigint unsigned | FK → `linktree_links.id`, ON DELETE CASCADE, INDEX | |
| `ip_address` | varchar(45) | nullable | Support IPv6 |
| `user_agent` | text | nullable | |
| `referer` | varchar(500) | nullable | |
| `country` | varchar(2) | nullable | ISO country code (opsional) |
| `clicked_at` | timestamp | INDEX | Waktu klik |

**Index recommendation:**
- Composite: `(linktree_link_id, clicked_at)` untuk query analytics per link by date range.

---

## 4. Admin CMS Endpoints

Semua endpoint admin **wajib auth** (Laravel Fortify / Sanctum).

### Profile Management

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/admin/linktree/profile` | Get current profile |
| `PUT` | `/admin/linktree/profile` | Update profile |

**PUT Body:**
```json
{
  "name": "RANIA",
  "tagline": "Redefine Hajj, Reimagined Journey",
  "avatar_url": "https://cdn.rania.co.id/icons/rania-logo.webp",
  "is_active": true
}
```

### Links Management

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/admin/linktree/links` | List all links (include inactive) |
| `POST` | `/admin/linktree/links` | Create new link |
| `GET` | `/admin/linktree/links/{id}` | Get single link |
| `PUT` | `/admin/linktree/links/{id}` | Update link |
| `DELETE` | `/admin/linktree/links/{id}` | Delete link |
| `PUT` | `/admin/linktree/links/reorder` | Bulk reorder (drag & drop) |

**POST/PUT Body:**
```json
{
  "title": "Official Website",
  "url": "https://www.rania.co.id",
  "order": 1,
  "is_active": true
}
```

**Reorder Body:**
```json
{
  "items": [
    { "id": 3, "order": 1 },
    { "id": 1, "order": 2 },
    { "id": 2, "order": 3 }
  ]
}
```

### Analytics

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/admin/linktree/analytics` | Aggregate stats (total clicks, top links, dll) |
| `GET` | `/admin/linktree/links/{id}/clicks` | Detail clicks per link (paginated) |

**Query params untuk analytics:**
- `from` (date) — start date
- `to` (date) — end date
- `per_page` (int) — pagination

**Example Response `/admin/linktree/analytics`:**
```json
{
  "success": true,
  "data": {
    "total_clicks": 1250,
    "total_clicks_today": 42,
    "total_clicks_this_week": 310,
    "top_links": [
      {
        "id": 1,
        "title": "Official Website",
        "click_count": 520
      }
    ],
    "clicks_by_day": [
      { "date": "2026-04-15", "count": 45 },
      { "date": "2026-04-16", "count": 52 }
    ]
  }
}
```

---

## 5. Validation Rules (Laravel)

### Profile

```php
[
    'name'       => 'required|string|max:100',
    'tagline'    => 'required|string|max:255',
    'avatar_url' => 'required|url|max:500',
    'is_active'  => 'boolean',
]
```

### Link

```php
[
    'title'     => 'required|string|max:100',
    'url'       => 'required|url|max:500',
    'order'     => 'nullable|integer|min:0',
    'is_active' => 'boolean',
]
```

### Reorder

```php
[
    'items'         => 'required|array|min:1',
    'items.*.id'    => 'required|integer|exists:linktree_links,id',
    'items.*.order' => 'required|integer|min:0',
]
```

---

## 6. Frontend Integration Plan

### Update [src/utils/constants.js](../../src/utils/constants.js)

Tambahkan ke `API_ENDPOINTS`:

```js
LINKTREE: '/api/linktree',
LINKTREE_CLICK: '/api/linktree/links',  // append /{id}/click
```

### Update [src/services/api.js](../../src/services/api.js)

```js
/**
 * Get linktree data (profile + links + social media)
 * @returns {Promise<{success: boolean, data: Object}>}
 */
export const getLinktree = async () => {
  const logPrefix = '[Linktree]';
  try {
    logger.debug(`📡 [API] GET ${API_ENDPOINTS.LINKTREE}`);
    const response = await apiRequest(API_ENDPOINTS.LINKTREE);
    logger.info(`✅ ${logPrefix} Response:`, {
      success: response.success,
      linksCount: response.data?.links?.length,
      socialCount: response.data?.social_media?.length,
    });
    return response;
  } catch (error) {
    logger.error(`❌ ${logPrefix} Error:`, error.message);
    throw error;
  }
};

/**
 * Track linktree link click (fire-and-forget)
 * @param {number} linkId
 */
export const trackLinktreeClick = (linkId) => {
  const endpoint = `${API_ENDPOINTS.LINKTREE_CLICK}/${linkId}/click`;
  // Fire-and-forget: jangan await, jangan blok navigasi user
  apiRequest(endpoint, { method: 'POST' }).catch((err) => {
    logger.warn('[Linktree] Click tracking failed:', err.message);
  });
};
```

### Update [src/pages/Linktree/Linktree.jsx](../../src/pages/Linktree/Linktree.jsx)

- Hapus `TEMP_LINKS` dan `TEMP_PROFILE` constants.
- Replace `useEffect` `getSocialMedia()` dengan single `getLinktree()` call.
- Tambahkan `onClick` handler pada link button untuk panggil `trackLinktreeClick(link.id)` sebelum navigasi.

---

## 7. Open Questions / Future Considerations

- **Avatar source of truth:** Akan pakai file static (`raniaLogo` import) atau full URL dari backend? Saat ini decision-nya cukup URL string, tapi perlu konfirmasi apakah `avatar_url` boleh kosong dan fallback ke asset frontend.
- **Bot filtering:** Click tracking sebaiknya skip request dari bot (user-agent detection) agar metric akurat.
- **Soft delete:** Apakah `linktree_links` perlu soft delete supaya history click tetap terhubung? Saat ini design pakai `ON DELETE CASCADE` — klik history ikut terhapus.
- **Multi-language:** Untuk sekarang **tidak diimplementasikan**. Kalau nanti dibutuhkan, tinggal tambah kolom `title_en`, `title_id` atau pakai pivot table translations.

---

## 8. Implementation Checklist (Backend)

- [ ] Create migrations: `linktree_profile`, `linktree_links`, `linktree_link_clicks`
- [ ] Create models dengan relationships
- [ ] Seed initial data dari `TEMP_LINKS` & `TEMP_PROFILE`
- [ ] Build public controller: `LinktreeController@show` & `@trackClick`
- [ ] Build admin controllers: `Admin\LinktreeProfileController`, `Admin\LinktreeLinkController`, `Admin\LinktreeAnalyticsController`
- [ ] Add routes (public + admin grup)
- [ ] Add validation form requests
- [ ] Add caching layer (Redis/file) untuk public endpoint
- [ ] Add rate limiting untuk click tracking endpoint
- [ ] Build CMS UI pages (Inertia + React) untuk manage profile, links (drag-drop reorder), dan analytics dashboard
- [ ] Write Pest tests untuk semua endpoint
