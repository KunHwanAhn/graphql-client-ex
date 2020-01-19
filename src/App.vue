<template>
  <div :class="$style.appContainer">
    <header :class="$style.appHeader">
      <div :class="$style.appNavContainer">
        <nav :class="$style.appNav">
          NavigationBar
        </nav>
      </div>
    </header>
    <div :class="$style.appMainContainer">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss" module>
.appContainer {
  overflow: auto;
}

.appHeader {
  margin-bottom: 16px;
}

.appNavContainer {
  width: 100%;
  height: 100%;
  border-bottom: 1px solid black;
}

.appNav {
  padding: 16px 0;
  margin: auto;
  max-width: 1080px;
}

.appMainContainer {
  min-height: 720px;
  display: flex;
  flex-direction: column;
}
</style>
