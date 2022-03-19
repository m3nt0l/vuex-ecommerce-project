<template>
  <div class="container-fluid">
    <div class="row ">
      <div class="col-md-12">
        <header>
          <div class="brand-img">
            <img src="@/assets/logo.png" alt="">
          </div>
        </header>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderComp"
}
</script>

<style lang="scss" scoped>
header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  margin-bottom: 30px;
  background: #000000;
  position: relative;
}

.brand-img {
  max-width: 50px;

  img {
    width: 100%;
    height: auto;
  }
}
</style>