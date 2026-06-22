<script lang="ts">
  import Button from '$components/ui/Button.svelte';
  import Input from '$components/ui/Input.svelte';
  import Textarea from '$components/ui/Textarea.svelte';
  import FadeUp from '$components/motion/FadeUp.svelte';
  import {
    siteContact,
    getSocialLinks,
    mapEmbedUrl,
    mapExternalUrl
  } from '$lib/data/site-contact';

  let name = $state('');
  let email = $state('');
  let message = $state('');
  let sent = $state(false);

  const socials = getSocialLinks();

  function onSubmit(e: SubmitEvent) {
    e.preventDefault();
    sent = true;
    // TODO: wire to /api/contact or SvelteKit form action when backend lands.
    setTimeout(() => {
      name = '';
      email = '';
      message = '';
    }, 0);
  }
</script>

<svelte:head>
  <title>Contact — YAZ Development</title>
  <meta
    name="description"
    content="Get in touch with YAZ Development. Office in Riyadh, King Fahd District. Phone, email, and on-site visits welcome."
  />
</svelte:head>

<!-- HERO -->
<section
  class="relative bg-white mesh-pattern overflow-hidden border-b border-line
         px-4 md:px-10 py-20 md:py-28"
>
  <div class="container mx-auto relative z-10 max-w-3xl text-center">
    <FadeUp>
      <p class="text-eyebrow text-brand-teal mb-4">Reach Us</p>
      <h1 class="font-display text-display text-ink leading-tight">
        Let's build <span class="text-brand-teal">together.</span>
      </h1>
      <p class="mt-6 text-body-lg text-ink-2">
        Tell us about your project. A surveyor or estimator usually replies within one business day.
      </p>
    </FadeUp>
  </div>
</section>

<!-- CONTACT GRID -->
<section class="bg-surface py-16 md:py-24 px-4 md:px-10">
  <div
    class="container mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 lg:items-stretch"
  >
    <!-- FORM -->
    <div class="min-w-0 lg:col-span-5 flex flex-col">
      <FadeUp class="h-full">
        <div class="bg-white p-6 md:p-8 rounded-xl border border-line shadow-sm h-full">
        {#if sent}
          <div class="text-center py-12">
            <div
              aria-hidden="true"
              class="w-14 h-14 mx-auto mb-4 rounded-pill bg-mint-tint text-lime-deep flex items-center justify-center text-h2 font-display"
            >✓</div>
            <h2 class="font-display text-h2 text-ink mb-2">Thanks — message received.</h2>
            <p class="text-body text-ink-2 mb-6">
              We'll be in touch shortly at the email you provided.
            </p>
            <button
              type="button"
              onclick={() => (sent = false)}
              class="text-label-mono text-brand-teal hover:text-deep-teal transition-colors"
            >Send another →</button>
          </div>
        {:else}
          <form onsubmit={onSubmit} class="flex flex-col gap-5" novalidate>
            <h2 class="font-display text-h2 text-ink">Send a message</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Name"
                name="name"
                bind:value={name}
                placeholder="Your name"
                required
                autocomplete="name"
              />
              <Input
                label="Email Address"
                name="email"
                type="email"
                bind:value={email}
                placeholder="you@company.com"
                required
                autocomplete="email"
              />
            </div>
            <Textarea
              label="Message"
              name="message"
              bind:value={message}
              placeholder="Project type, scope, location, target dates…"
              rows={6}
              required
            />
            <div class="mt-2">
              <Button type="submit" variant="accent" size="lg" fullWidth>Submit</Button>
            </div>
          </form>
        {/if}
        </div>
      </FadeUp>
    </div>

    <!-- MAP -->
    <div class="min-w-0 lg:col-span-4 flex flex-col">
      <FadeUp class="h-full">
        <div
          class="bg-white rounded-xl border border-line shadow-sm h-full flex flex-col overflow-hidden min-h-[20rem] lg:min-h-0"
        >
          <div class="relative flex-1 min-h-[18rem]">
            <iframe
              title="YAZ Development office on Google Maps"
              src={mapEmbedUrl}
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              allowfullscreen
              class="absolute inset-0 w-full h-full border-0"
            ></iframe>
          </div>
          <div class="px-4 py-3 border-t border-line bg-white shrink-0">
            <a
              href={mapExternalUrl}
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 text-label-mono text-brand-teal hover:text-deep-teal transition-colors"
            >
              Open in Google Maps <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </FadeUp>
    </div>

    <!-- INFO + SOCIALS -->
    <div class="min-w-0 lg:col-span-3 flex flex-col">
      <FadeUp class="h-full">
        <div class="bg-white p-6 md:p-7 rounded-xl border border-line shadow-sm flex flex-col gap-7 h-full">
          <h2 class="font-display text-h3 text-ink">Contact details</h2>

          <!-- Address -->
          <div class="flex gap-4 items-start">
            <span
              aria-hidden="true"
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-sky-tint text-brand-teal"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
            </span>
            <div class="min-w-0 pt-0.5">
              <h3 class="text-small font-semibold text-ink mb-1.5">Address</h3>
              <address class="not-italic text-body text-ink-2 leading-relaxed">
                {siteContact.addressLine1}<br />{siteContact.addressLine2}
              </address>
            </div>
          </div>

          <!-- Phones -->
          <div class="flex gap-4 items-start">
            <span
              aria-hidden="true"
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-sky-tint text-brand-teal"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"
                />
              </svg>
            </span>
            <div class="min-w-0 pt-0.5">
              <h3 class="text-small font-semibold text-ink mb-1.5">Phone</h3>
              <div class="flex flex-col gap-1.5">
                {#each siteContact.phones as p (p)}
                  <a
                    href={`tel:${p.replace(/\s/g, '')}`}
                    class="text-body text-ink-2 hover:text-brand-teal transition-colors"
                  >{p}</a>
                {/each}
              </div>
            </div>
          </div>

          <!-- Email -->
          <div class="flex gap-4 items-start">
            <span
              aria-hidden="true"
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-sky-tint text-brand-teal"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                />
                <path stroke-linecap="round" stroke-linejoin="round" d="m22 6-10 7L2 6" />
              </svg>
            </span>
            <div class="min-w-0 pt-0.5">
              <h3 class="text-small font-semibold text-ink mb-1.5">Email</h3>
              <a
                href={`mailto:${siteContact.email}`}
                class="text-body text-ink-2 hover:text-brand-teal transition-colors break-all"
              >{siteContact.email}</a>
            </div>
          </div>

          <!-- Socials -->
          <div class="pt-2 border-t border-line">
            <h3 class="text-eyebrow text-ink-3 mb-3">Follow</h3>
            <div class="flex flex-wrap gap-2.5">
              {#each socials as s (s.label)}
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  class="w-10 h-10 rounded-md border border-line bg-surface text-ink-2
                         hover:text-brand-teal hover:border-brand-teal hover:bg-sky-tint
                         transition-all duration-200 flex items-center justify-center"
                >
                  {#if s.svg === 'linkedin'}
                    <svg viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5" aria-hidden="true"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.13 1.45-2.13 2.94v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.26 2.37 4.26 5.45v6.29zM5.34 7.43c-1.14 0-2.07-.93-2.07-2.07s.93-2.07 2.07-2.07 2.07.93 2.07 2.07-.93 2.07-2.07 2.07zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.99 0 1.78-.77 1.78-1.73V1.73C24 .77 23.21 0 22.22 0z"/></svg>
                  {:else if s.svg === 'youtube'}
                    <svg viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5" aria-hidden="true"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.6 3.6 12 3.6 12 3.6s-7.6 0-9.4.5A3 3 0 0 0 .5 6.2C0 8 0 12 0 12s0 4 .5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.6 0 9.4-.5a3 3 0 0 0 2.1-2.1c.5-1.8.5-5.8.5-5.8s0-4-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z"/></svg>
                  {:else if s.svg === 'tiktok'}
                    <svg viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5" aria-hidden="true"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.84 20.5a6.33 6.33 0 0 0 10.45-4.83V8.65a8.16 8.16 0 0 0 4.77 1.52V6.69a4.85 4.85 0 0 1-1.47-.04z"/></svg>
                  {:else if s.svg === 'facebook'}
                    <svg viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5" aria-hidden="true"><path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.69.24 2.69.24v2.97h-1.52c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z"/></svg>
                  {:else if s.svg === 'instagram'}
                    <svg viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5" aria-hidden="true"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07zm0-2.16C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.31-1.46.72-2.13 1.39A5.9 5.9 0 0 0 .63 4.14c-.3.76-.5 1.64-.56 2.91C.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.79.72 1.46 1.39 2.13.67.67 1.34 1.08 2.13 1.39.76.3 1.64.5 2.91.56 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56.79-.31 1.46-.72 2.13-1.39a5.9 5.9 0 0 0 1.39-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.9 5.9 0 0 0-1.39-2.13A5.9 5.9 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/></svg>
                  {/if}
                </a>
              {/each}
            </div>
          </div>
        </div>
      </FadeUp>
    </div>
  </div>
</section>
