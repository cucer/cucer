import type { ComponentType } from 'react';
import type { DemoClient, DemoTemplate } from '../types';
import RestaurantLanding from './restaurant/Landing';
import RestaurantMenu from './restaurant/Menu';

type TemplateViews = {
  Landing: ComponentType<{ client: DemoClient }>;
  Menu: ComponentType<{ client: DemoClient }>;
};

/* Routes render whatever the client's `template` points at. A second industry
   — cafe, barber, whatever comes next — is a new folder plus a line here, with
   no change to the routing layer. */
export const templates: Record<DemoTemplate, TemplateViews> = {
  restaurant: { Landing: RestaurantLanding, Menu: RestaurantMenu },
};
