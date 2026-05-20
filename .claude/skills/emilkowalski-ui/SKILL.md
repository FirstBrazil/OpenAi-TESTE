---
name: emilkowalski-ui
description: Build polished React UI with the animation and interaction principles popularized by Emil Kowalski (Sonner, Vaul, motion). Use when creating or refining toasts, drawers, dialogs, dropdowns, popovers, transitions, or any micro-interaction in a React/Next.js codebase — or when the user asks for "smooth", "polished", "native-feeling" UI.
---

# Emil Kowalski UI & Motion

Apply these principles whenever you build or refine a React component that animates, transitions, or responds to user input.

## Libraries to prefer

- **Animation**: `motion` (the maintained successor to `framer-motion`). Import from `motion/react`.
- **Toasts**: `sonner`.
- **Drawer / bottom sheet**: `vaul`.
- **Primitives**: Radix UI for accessibility, then style and animate on top.

Reach for these before hand-rolling. Only build from scratch if the requirement genuinely doesn't fit.

## Motion principles

1. **Spring, not linear.** Default to springs for anything physical (drag, open/close, drawers). Use eased curves only for short, non-physical fades.
2. **Short durations.** 150–250ms for most transitions. Anything over 400ms feels sluggish unless it's a hero moment.
3. **Origin-aware.** Animate from where the action originated. A dropdown opens from its trigger, not from the center of the screen. Set `transform-origin` accordingly.
4. **Asymmetric enter/exit.** Exits are often faster than enters. Don't reuse the same transition for both directions blindly.
5. **Animate `transform` and `opacity` only.** Avoid animating `width`, `height`, `top`, `left` — they cause layout thrash. Use `scale`, `translate`, and `opacity`.
6. **One thing at a time.** Don't animate five properties simultaneously. Pick the one or two that carry the meaning.
7. **Respect `prefers-reduced-motion`.** Wrap motion in a check or use motion's `useReducedMotion`.

## Interaction principles

- **Drag should feel real.** Use rubber-band resistance at boundaries (Vaul does this by default). Velocity matters — flick to dismiss.
- **Dismiss should be forgiving.** Tap outside, swipe down, Escape — all should work.
- **Focus management.** When a dialog/drawer opens, focus its first interactive element. When it closes, return focus to the trigger.
- **Loading states are interactions too.** Skeletons over spinners. Optimistic UI where safe.

## Visual taste

- Subtle shadows, not heavy ones. Layered shadows beat single big shadows.
- Borders at low opacity (`border-black/5`, `border-white/10`) over solid grays.
- Rounded corners that match scale: 6–8px for buttons, 12–16px for cards, 20–24px for sheets.
- Monochrome first. Color is for state and emphasis, not decoration.

## Code patterns

```tsx
// Good: spring on transform, origin-aware
<motion.div
  initial={{ opacity: 0, scale: 0.96, y: -4 }}
  animate={{ opacity: 1, scale: 1, y: 0 }}
  exit={{ opacity: 0, scale: 0.96, y: -4 }}
  transition={{ type: "spring", stiffness: 400, damping: 30 }}
  style={{ transformOrigin: "top right" }}
/>

// Good: Sonner for toasts, not a custom queue
import { Toaster, toast } from "sonner";
toast.success("Saved");

// Good: Vaul for bottom sheets on mobile
import { Drawer } from "vaul";
```

## What to avoid

- `transition: all` — too broad, animates unintended properties.
- Linear easing on physical motion.
- Long fades (>300ms) for routine UI.
- Animating layout-affecting properties.
- Custom drawer/toast implementations when Vaul/Sonner exist.

## When the user asks for "smooth" or "polished"

That phrase is a trigger. Audit the component against this list, then propose the two or three changes that will matter most — don't rewrite everything.
