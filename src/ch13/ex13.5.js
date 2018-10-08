const { animationFrameScheduler, interval } = rxjs;

const scheduler = animationFrameScheduler;
const animation$ = interval(0, scheduler);
