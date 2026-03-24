# happytails.co.in — DNS Setup

Your domain **happytails.co.in** (and **www.happytails.co.in**) is added to your Vercel project. Finish setup by adding these DNS records at your domain registrar.

## Where to add DNS records

Log in to the site where you bought **happytails.co.in** (e.g. GoDaddy, Namecheap, Google Domains, etc.) and open the DNS management section.

## Records to add

| Type | Name/Host | Value | TTL |
|------|-----------|-------|-----|
| **A** | `@` (or leave blank for root) | `76.76.21.21` | 3600 |
| **CNAME** | `www` | `cname.vercel-dns.com` | 3600 |

### Notes

- **A record** — For the root domain (happytails.co.in). Use `@` or blank as the host.
- **CNAME record** — For www.happytails.co.in. Use `www` as the host.

## After adding records

1. Save the DNS changes.
2. Wait 5–60 minutes (sometimes up to 48 hours).
3. Vercel will verify and issue an SSL certificate.
4. Your site will be available at **https://happytails.co.in** and **https://www.happytails.co.in**.

## Check status

- Vercel dashboard: [vercel.com](https://vercel.com) → Your Project → Settings → Domains
- Or run: `npx vercel domains inspect happytails.co.in`
