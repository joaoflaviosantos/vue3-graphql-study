# https://stackoverflow.com/questions/3004811/how-do-you-run-multiple-programs-in-parallel-from-a-bash-script

cd backend/ && node server &
P1=$!
cd frontend/ && npm run dev -- --host &
P2=$!
wait $P1 $P2