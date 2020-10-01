<template>
     <div class="layout  width-max position-r left-0  border-success margin-top-10" style="border:0px solid blue">
      <slot>
        <div class="layout margin-top-10 margin-bottom-10 clearfix">
          <slot name="layout"></slot>
        </div>
      </slot>
      <div class="layout margin-top-10 margin-bottom-10 clearfix">
          <slot name="layout"></slot>
        </div>
     </div>
</template>