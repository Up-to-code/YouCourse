import Container from "@/components/common/Container";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function loading() {
  return (
    <div>
      <Container>
        <Skeleton className="h-10 w-full" />
      </Container>
    </div>
  );
}

export default loading;
