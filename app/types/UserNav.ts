export type UserNavChildItem = {
  id: string;
  label: string;
  ariaLabel: string;
  icon: string;
  to: string;
};

export type UserNavItem = UserNavChildItem & {
  children?: UserNavChildItem[];
};
