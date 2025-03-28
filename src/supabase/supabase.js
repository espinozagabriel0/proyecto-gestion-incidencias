import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rckoapsickeinxcrsphi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJja29hcHNpY2tlaW54Y3JzcGhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5MjYyNzAsImV4cCI6MjA1ODUwMjI3MH0.Dl4J2zAkE6pBrqpjYd7T0xpVkgpw8-XU_Am7O1hL56M';
export const supabase = createClient(supabaseUrl, supabaseKey);

