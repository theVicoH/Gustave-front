import { NextResponse } from "next/server";
import { NextApiService } from "@/app/core/api/NextApiService";

export async function GET() {
    try {
        const api = new NextApiService(); // Création manuelle de l'instance
        const response = await api.get('/sanctum/csrf-cookie', {
            useWebEnvironment: true
        });
        
        // Create a new NextResponse with the original response's headers
        return new NextResponse(null, {
            status: response.status,
            headers: response.headers
        });
    } catch (error) {
        console.error('CSRF error:', error);
        return NextResponse.json(
            { 
                status: "error",
                message: error instanceof Error ? error.message : "CSRF token refresh failed"
            },
            { 
                status: error instanceof Error ? (error as any).status || 500 : 500 
            }
        );
    }
}
