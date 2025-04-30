import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";
import { IRecipe } from '@/app/types/recipe';

const prisma = new PrismaClient();

export async function GET() {
    const recipes = await prisma.recipes.findMany();
    return NextResponse.json(recipes);
    }

export async function POST(request: NextRequest) {
    const body = await request.json();
    console.log(request);
    console.log('BODY', body)

    const recipeData: IRecipe = {
        title: body.title,
        description: body.description,
        ingredients: body.ingredients,
        instructions: body.instructions,
        time: body.time,
        difficulty: body.difficulty,
        authorId: body.authorId
    }
    const recipe = await prisma.recipes.create({
        data: recipeData
    });
    return NextResponse.json(recipeData);
};


