import { Fragment, ReactNode } from "react";

import Header from "@/components/layout/header/Header";

export default function SiteLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <Fragment>
      <Header />
      {children}
    </Fragment>
  );
}
