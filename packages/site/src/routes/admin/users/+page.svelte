<script lang="ts">
  import type { IUser } from '@hvsb/types';
  import Button from 'svelte-pieces/ui/Button.svelte';
  import ResponsiveTable from 'svelte-pieces/ui/ResponsiveTable.svelte';
  import { Collection } from 'sveltefirets';
  import View from '$lib/components/ui/View.svelte';
  import Filter from './_Filter.svelte';
  import SortUsers from './_SortUsers.svelte';
  import UserRow from './_UserRow.svelte';
  import { exportUsersAsCSV } from '$lib/helpers/export';

  let usersType: IUser[] = [];
</script>

<View padding={true}>
  <Collection path="users" startWith={usersType} let:data={users}>
    <Filter items={users} let:filteredItems={filteredUsers} placeholder="Search names and emails">
      <div slot="right">
        <Button
          form="filled"
          color="black"
          onclick={() => exportUsersAsCSV(filteredUsers, 'hvsb-users')}>
          <i class="fas fa-download mr-1" />
          Download {filteredUsers.length} Users as CSV
        </Button>
      </div>

      <div class="my-1">
        <ResponsiveTable stickyColumn stickyHeading>
          <SortUsers users={filteredUsers} let:sortedUsers>
            {#each sortedUsers as user}
              <UserRow {user} />
            {/each}
          </SortUsers>
        </ResponsiveTable>
      </div>
    </Filter>
  </Collection>
</View>
