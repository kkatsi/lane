import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/boards",
    },
    {
      path: "/boards",
      name: "boards",
      component: () => import("../views/Boards.vue"),
    },
    {
      path: "/boards/:boardId",
      name: "board",
      component: () => import("../views/Board.vue"),
    },
  ],
});

export default router;
