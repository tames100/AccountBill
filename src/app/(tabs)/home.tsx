import { LayoutComponent } from "@/components/Common/LayoutComponent";
import { AddTransactionModal, TabHeader } from "@/components/Home";
import HomeContainer from "@/components/Home/HomeContainer";
import React from "react";

export default function Home() {
  return (
    <LayoutComponent>
      <LayoutComponent.Header>
        <TabHeader></TabHeader>
      </LayoutComponent.Header>
      <LayoutComponent.Content>
        <HomeContainer />
      </LayoutComponent.Content>
      <AddTransactionModal />
    </LayoutComponent>
  );
}
