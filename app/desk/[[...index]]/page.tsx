'use client';

import config from "@/sanity.confg";
import { NextStudio } from "next-sanity/studio";

export default function AdminPage(){
    return <NextStudio config = {config}/>
}