<template>
  <footer class="fab-footer">
    <p>
      Powered by
      <a
        class="link-decoration"
        target="_blank"
        href="https://fastsite.it"
      >FastSite</a>
    </p>
  </footer>
</template>

<style scoped>
.fab-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  border-top: 1px solid;
  border-top-color: var(--border-color);
  background-color: #f9f9f9;
  border-radius: 0 0 30px 30px;
  color: #000;
  flex-shrink: 0;
  font-size: 14px;
}

.link-decoration {
  color: var(--theme-color);
  text-decoration: none;
}

.link-decoration:hover {
  text-decoration: underline;
}

@media screen and (max-width: 768px) {
  .fab-footer {
    height: 40px;
    font-size: 12px;
    border-radius: 0;
    padding: 0 10px;
  }

}

@media (min-width: 768px) and (max-width: 1440px) {
  .fab-footer {
    height: 35px;
    font-size: 13px;
  }
}
</style>
