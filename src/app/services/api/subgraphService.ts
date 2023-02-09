import { subgraphService } from "src/app/services/subgraph/subgraphService";
import { SYNCED_BLOCK_QUERY } from "src/app/services/subgraph/subgraphQueries";

export async function querySyncedBlock(): Promise<number> {
  try {
    const result = await subgraphService.query({
      query: SYNCED_BLOCK_QUERY(),
      fetchPolicy: "no-cache",
    });

    return result.data._meta.block.number;
  } catch (error) {
    return 0;
  }
}


